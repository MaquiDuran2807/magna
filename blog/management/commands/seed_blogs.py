import io
import os
import random
from datetime import timedelta
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.utils import timezone
from user.models import User
from blog.models import Category, BlogPost, Comment


CATEGORIAS = [
    'Topografía', 'Geodesia', 'GPS', 'Drones', 'Construcción',
    'Ingeniería Civil', 'Catastro', 'SIG', 'Minería', 'Hidrología',
]

LOREM_LARGO = [
    'La topografía es la ciencia que estudia los métodos necesarios para llegar a la representación gráfica de la superficie terrestre.',
    'La geodesia es la ciencia que estudia la forma y dimensiones de la Tierra, incluyendo la determinación del campo gravitatorio.',
    'El uso de estaciones totales ha revolucionado la forma en que los topógrafos realizan mediciones de precisión en el campo.',
    'Los drones se han convertido en una herramienta indispensable para la fotogrametría y el levantamiento topográfico moderno.',
    'El sistema de posicionamiento global GPS permite determinar coordenadas con precisión centimétrica en tiempo real.',
    'La nivelación geométrica es un procedimiento topográfico que determina diferencias de altura entre puntos del terreno.',
    'El catastro es un registro administrativo de los bienes inmuebles que describe sus características físicas y jurídicas.',
    'Los sistemas de información geográfica SIG permiten analizar y visualizar datos espaciales de manera interactiva.',
    'La fotogrametría digital permite extraer información tridimensional de fotografías aéreas y terrestres.',
    'El levantamiento topográfico es el conjunto de operaciones necesarias para representar el terreno en un plano.',
]

LOREM_CORTO = [
    'Métodos avanzados de medición topográfica para proyectos de alta precisión.',
    'Cómo optimizar tus levantamientos con drones y fotogrametría digital.',
    'Guía completa de estaciones totales: calibración, uso y mantenimiento.',
    'Sistemas GNSS en tiempo real para obras de ingeniería civil.',
    'La importancia de la geodesia en proyectos de infraestructura vial.',
    'Nuevas tecnologías en catastro multipropósito para municipios.',
    'Aplicaciones de la topografía en la industria minera.',
    'Control de calidad en mediciones topográficas con software especializado.',
    'Gestión de datos geoespaciales con herramientas open source.',
    'Normativas vigentes para levantamientos topográficos en Chile.',
]

PARRAFOS_CKEDITOR = [
    '<p>La <strong>topografía moderna</strong> ha evolucionado significativamente en las últimas décadas. <span style="color:#1a365d">Los instrumentos actuales permiten precisiones milimétricas</span> que eran impensables hace solo unos años.</p><p>El uso de <em>estaciones totales robóticas</em> combinadas con <u>GNSS en tiempo real</u> ha permitido reducir los tiempos de levantamiento hasta en un 60%. <span style="font-size:18px">Esto representa un avance significativo</span> para la productividad del sector.</p>',
    '<h2>Nuevas tecnologías disponibles</h2><p>Los <span style="color:#2d3748;font-weight:700">drones con LiDAR</span> integrado están transformando la forma en que se realizan los levantamientos de gran escala. <span style="background-color:#ebf8ff;padding:2px 6px">La densidad de puntos alcanza los 200 pts/m²</span> con una precisión vertical de 2-3 cm.</p><p>La <span style="color:#c53030;font-weight:600">fotogrametría con drones</span> sigue siendo la opción más económica para proyectos de mediana escala, ofreciendo resultados comparables al LiDAR en superficies con buena textura.</p>',
    '<p>Para proyectos de <span style="font-family:Georgia,serif;color:#744210">infraestructura vial</span> se recomienda utilizar una combinación de métodos:</p><ol><li><span style="color:#2b6cb0">GPS diferencial</span> para el control horizontal</li><li><span style="color:#2b6cb0">Nivelación geométrica</span> para el control vertical</li><li><span style="color:#2b6cb0">Escáner láser</span> para detalles de obras de arte</li></ol><p>Esta metodología garantiza <span style="font-size:16px;font-weight:700;color:#276749">precisiones dentro de las tolerancias</span> exigidas por la normativa vigente.</p>',
    '<h3>Recomendaciones del experto</h3><p style="background-color:#f0fff4;padding:15px;border-left:4px solid #48bb78"><span style="font-family:Courier New,monospace;font-size:14px;color:#22543d">"La clave está en la planificación del levantamiento. Un 70% del éxito depende del diseño previo de la red de apoyo."</span></p><p>Además, es fundamental <span style="text-decoration:underline wavy #d69e2e">verificar los equipos antes de salir a terreno</span> y llevar siempre baterías de respaldo y targets de sobra.</p>',
    '<h2>Mantenimiento de equipos</h2><p>El <span style="color:#9b2c2c;font-weight:bold">mantenimiento preventivo</span> de las estaciones totales debe realizarse cada 6 meses o 100 horas de uso. <span style="background-color:#fffff0;padding:3px">La limpieza del lente y los prismas</span> debe hacerse con paños especiales para evitar rayaduras.</p><p>Los <span style="color:#2c5282">niveles digitales</span> requieren calibración anual y almacenamiento en <span style="font-weight:500">condiciones controladas de temperatura y humedad</span>.</p>',
    '<p>La <span style="font-family:Trebuchet MS,sans-serif;font-size:16px;color:#553c9a">gestión de datos geoespaciales</span> es un componente crítico en cualquier proyecto de ingeniería. <span style="color:#e53e3e">Los formatos abiertos</span> como GeoJSON y GPX facilitan la interoperabilidad entre plataformas.</p><p>Se recomienda mantener <span style="background:#edf2f7;padding:2px 8px;border-radius:3px">copias de seguridad en la nube</span> y utilizar sistemas de control de versiones para los datasets más importantes.</p>',
]

IMAGENES_SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#1a365d"/><circle cx="200" cy="200" r="100" fill="#d69e2e" opacity="0.8"/><circle cx="400" cy="180" r="80" fill="#48bb78" opacity="0.7"/><circle cx="600" cy="220" r="90" fill="#4299e1" opacity="0.8"/><text x="400" y="360" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">Topografía de Precisión</text></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#2d3748"/><rect x="50" y="300" width="120" height="60" fill="#d69e2e" rx="4"/><rect x="200" y="250" width="120" height="110" fill="#4299e1" rx="4"/><rect x="350" y="200" width="120" height="160" fill="#48bb78" rx="4"/><rect x="500" y="150" width="120" height="210" fill="#ed8936" rx="4"/><rect x="650" y="280" width="120" height="80" fill="#9f7aea" rx="4"/><text x="400" y="370" font-family="Arial" font-size="20" fill="white" text-anchor="middle">Levantamiento Topográfico</text></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#1a202c"/><path d="M0 350 L100 200 L200 280 L300 150 L400 220 L500 100 L600 180 L700 80 L800 120 L800 400 L0 400 Z" fill="#48bb78" opacity="0.5"/><path d="M0 350 L100 250 L200 300 L300 200 L400 260 L500 160 L600 220 L700 130 L800 180 L800 400 L0 400 Z" fill="#4299e1" opacity="0.5"/><circle cx="200" cy="200" r="6" fill="#d69e2e"/><circle cx="500" cy="120" r="6" fill="#d69e2e"/><circle cx="700" cy="90" r="6" fill="#d69e2e"/><text x="400" y="380" font-family="Arial" font-size="20" fill="white" text-anchor="middle">Perfil Longitudinal - Proyecto Vial</text></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#0d3b72"/><polygon points="400,50 500,150 450,150 550,250 500,250 600,350 200,350 300,250 250,250 350,150 300,150" fill="#d69e2e" opacity="0.7"/><circle cx="400" cy="200" r="40" fill="none" stroke="white" stroke-width="2"/><circle cx="400" cy="200" r="3" fill="white"/><line x1="400" y1="200" x2="440" y2="180" stroke="white" stroke-width="1.5"/><text x="400" y="380" font-family="Arial" font-size="20" fill="white" text-anchor="middle">GPS Diferencial en Obra</text></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#22543d"/><polygon points="200,350 400,80 600,350" fill="none" stroke="#d69e2e" stroke-width="3"/><circle cx="400" cy="80" r="8" fill="#d69e2e"/><line x1="400" y1="88" x2="400" y2="300" stroke="white" stroke-width="1" stroke-dasharray="5,5"/><rect x="370" y="300" width="60" height="20" fill="#d69e2e" rx="3"/><text x="200" y="340" font-family="Arial" font-size="14" fill="white" text-anchor="middle">A</text><text x="600" y="340" font-family="Arial" font-size="14" fill="white" text-anchor="middle">B</text><text x="400" y="370" font-family="Arial" font-size="20" fill="white" text-anchor="middle">Nivelación Geométrica</text></svg>',
]


def generar_color_fondo():
    colores = ['#1a365d', '#2d3748', '#22543d', '#744210', '#1a202c', '#0d3b72', '#553c9a', '#2c5282']
    return random.choice(colores)


class Command(BaseCommand):
    help = 'Genera datos de prueba para el blog con contenido variado'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Generando seed de blogs...'))

        editor, _ = User.objects.get_or_create(
            email='seed@editor.com',
            defaults={
                'first_name': 'Editor',
                'last_name': 'Seed',
                'is_staff': True,
                'is_editor': True,
            },
        )
        if not editor.password or editor.password.startswith('!'):
            editor.set_password('EditorPass123!')
            editor.save()

        author2, _ = User.objects.get_or_create(
            email='maria@topografia.cl',
            defaults={'first_name': 'María', 'last_name': 'González'},
        )
        if not author2.password or author2.password.startswith('!'):
            author2.set_password('AuthorPass123!')
            author2.save()

        author3, _ = User.objects.get_or_create(
            email='carlos@geodesia.cl',
            defaults={'first_name': 'Carlos', 'last_name': 'Muñoz'},
        )
        if not author3.password or author3.password.startswith('!'):
            author3.set_password('AuthorPass123!')
            author3.save()

        autores = [editor, author2, author3]
        self.stdout.write(f'  {len(autores)} autores listos')

        categorias = []
        for nombre in CATEGORIAS:
            cat, _ = Category.objects.get_or_create(name=nombre)
            categorias.append(cat)
        self.stdout.write(f'  {len(categorias)} categorías listas')

        BlogPost.objects.filter(title__startswith='[Seed]').delete()
        Comment.objects.filter(text__startswith='[Comentario seed]').delete()

        now = timezone.now()
        posts = []

        for i in range(24):
            idx_largo = i % len(LOREM_LARGO)
            idx_corto = i % len(LOREM_CORTO)
            idx_parrafo = i % len(PARRAFOS_CKEDITOR)
            idx_svg = i % len(IMAGENES_SVG)

            titulo = f'[Seed] {LOREM_CORTO[idx_corto]}'
            if i % 6 == 0:
                titulo = f'[Seed] {LOREM_CORTO[idx_corto].upper()}'
            elif i % 7 == 0:
                titulo = f'[Seed] {LOREM_CORTO[idx_corto].title()}'

            contenido = f'<p style="font-size:14px;color:#4a5568">{LOREM_LARGO[idx_largo]}</p>'
            contenido += PARRAFOS_CKEDITOR[idx_parrafo]
            contenido += f'<p style="font-size:14px;color:#4a5568">{LOREM_LARGO[(idx_largo + 1) % len(LOREM_LARGO)]}</p>'

            if i % 3 == 0:
                contenido += f'<blockquote><p style="font-family:Georgia,serif;font-style:italic;color:#744210;font-size:16px">"El conocimiento topográfico es la base de toda obra de ingeniería bien ejecutada."</p></blockquote>'

            if i % 4 == 0:
                contenido += '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;margin:10px 0">'
                contenido += '<tr style="background-color:#1a365d;color:white"><th>Equipo</th><th>Precisión</th><th>Alcance</th></tr>'
                contenido += f'<tr><td>Estación Total</td><td>1" / ±(2mm+2ppm)</td><td>{random.randint(500, 3500)}m</td></tr>'
                contenido += f'<tr style="background-color:#f7fafc"><td>GPS RTK</td><td>H: ±(8mm+1ppm)</td><td>{random.randint(10, 50)}km</td></tr>'
                contenido += f'<tr><td>Nivel Digital</td><td>±0.3mm/km</td><td>{random.randint(100, 500)}m</td></tr>'
                contenido += '</table>'

            contenido += f'<p style="font-size:13px;color:#718096;font-family:Verdana,sans-serif">{LOREM_CORTO[(idx_corto + 1) % len(LOREM_CORTO)]}</p>'
            contenido += f'<p style="background-color:#f0f4f8;padding:12px;border-radius:6px;color:#2d3748;font-family:Trebuchet MS,sans-serif;line-height:1.6">{LOREM_LARGO[(idx_largo + 2) % len(LOREM_LARGO)]}</p>'

            post = BlogPost(
                title=titulo,
                description=LOREM_CORTO[idx_corto],
                content=contenido,
                author=random.choice(autores),
                important=i < 8,
                category=random.choice(categorias),
            )

            svg_content = IMAGENES_SVG[idx_svg]
            color_fondo = generar_color_fondo()
            svg_content = svg_content.replace(
                'fill="#1a365d"', f'fill="{color_fondo}"'
            )

            svg_bytes = svg_content.encode('utf-8')
            buffer = io.BytesIO(svg_bytes)
            filename = f'seed_blog_{i:02d}.svg'
            post.image_blog.save(filename, ContentFile(buffer.getvalue()), save=False)

            dias_atras = timedelta(
                days=random.randint(0, 60),
                hours=random.randint(0, 23),
                minutes=random.randint(0, 59),
            )
            post.date_posted = now - dias_atras
            post.save()
            posts.append(post)

        self.stdout.write(f'  {len(posts)} posts creados')

        for i, post in enumerate(posts):
            if i % 3 != 0:
                continue
            for j in range(random.randint(1, 3)):
                Comment.objects.create(
                    post=post,
                    author=random.choice(autores),
                    text=f'[Comentario seed] Muy buen artículo sobre {post.category.name}. Me gustaría saber más sobre las aplicaciones prácticas en terreno.',
                    created_date=post.date_posted + timedelta(hours=random.randint(1, 48)),
                )
        self.stdout.write(f'  Comentarios creados en {len(posts) // 3} posts')

        self.stdout.write(self.style.SUCCESS(f'Seed completado: {len(posts)} posts, {len(categorias)} categorías, {len(autores)} autores'))
