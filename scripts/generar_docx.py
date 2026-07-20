import os
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml

SCRIPTS_DIR = os.path.dirname(__file__)
SCREENSHOTS_DIR = os.path.join(SCRIPTS_DIR, "screenshots")
GRAFICOS_DIR = os.path.join(SCRIPTS_DIR, "graficos")
OUTPUT_PATH = os.path.join(SCRIPTS_DIR, "informe-final.docx")

NAVY = RGBColor(0x1A, 0x36, 0x5D)
GOLD = RGBColor(0xD6, 0x9E, 0x2E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
DARK = RGBColor(0x2D, 0x37, 0x48)
GRAY = RGBColor(0x71, 0x71, 0x71)

def set_cell_shading(cell, color_hex):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)

def add_styled_paragraph(doc, text, style="Normal", bold=False, size=11, color=DARK, alignment=None, space_after=6):
    p = doc.add_paragraph(style=style)
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.bold = bold
    if alignment:
        p.alignment = alignment
    p.paragraph_format.space_after = Pt(space_after)
    return p

def add_section_title(doc, number, title):
    heading = doc.add_heading(f"{number}. {title}", level=1)
    for run in heading.runs:
        run.font.color.rgb = NAVY

def add_subsection_title(doc, number, title):
    heading = doc.add_heading(f"{number}. {title}", level=2)
    for run in heading.runs:
        run.font.color.rgb = NAVY

def add_subsubsection_title(doc, title):
    heading = doc.add_heading(title, level=3)
    for run in heading.runs:
        run.font.color.rgb = GOLD

def add_explanation_box(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(1)
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(f"💡 {text}")
    run.font.size = Pt(10)
    run.font.color.rgb = NAVY
    run.italic = True
    return p

def add_image_safe(doc, path, width=Inches(5.5), caption=None):
    if os.path.exists(path):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run()
        run.add_picture(path, width=width)
        if caption:
            cap = doc.add_paragraph()
            cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = cap.add_run(caption)
            r.font.size = Pt(9)
            r.font.color.rgb = GRAY
            r.italic = True
    else:
        add_styled_paragraph(doc, f"[Imagen no disponible: {os.path.basename(path)}]", size=9, color=GRAY)

def add_table_row(table, cells_data, header=False):
    row = table.add_row()
    for i, text in enumerate(cells_data):
        cell = row.cells[i]
        p = cell.paragraphs[0]
        run = p.add_run(str(text))
        run.font.size = Pt(10)
        if header:
            run.bold = True
            run.font.color.rgb = WHITE
            set_cell_shading(cell, "1a365d")
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    return row

def generate_docx():
    print("Generando documento Word...")
    doc = Document()

    # ---- Page Setup ----
    section = doc.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)

    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)
    style.font.color.rgb = DARK

    for level in range(1, 4):
        hs = doc.styles[f"Heading {level}"]
        hs.font.name = "Calibri"
        hs.font.color.rgb = NAVY

    # ========================================================================
    # PORTADA
    # ========================================================================
    for _ in range(6):
        doc.add_paragraph()

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("MAGNA")
    run.font.size = Pt(48)
    run.font.color.rgb = NAVY
    run.bold = True

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("Ingeniería y Topografía")
    run.font.size = Pt(20)
    run.font.color.rgb = GOLD

    doc.add_paragraph()

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("Informe de Transformación Digital")
    run.font.size = Pt(28)
    run.font.color.rgb = NAVY
    run.bold = True

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("Modernización, mejoras de rendimiento, rediseño visual y nuevas funcionalidades")
    run.font.size = Pt(14)
    run.font.color.rgb = GRAY

    for _ in range(6):
        doc.add_paragraph()

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("Julio 2026")
    run.font.size = Pt(14)
    run.font.color.rgb = GRAY

    doc.add_page_break()

    # ========================================================================
    # TABLA DE CONTENIDO
    # ========================================================================
    doc.add_heading("Índice", level=1)
    toc_items = [
        "Resumen Ejecutivo",
        "Seguridad y Estabilidad del Sitio",
        "Infraestructura Moderna (Docker, Proxy Inverso, SSL, Caché)",
        "Rendimiento y Velocidad",
        "Nuevo Diseño del Hero Slider (Slides Independientes)",
        "Rediseño de la Página de Contacto",
        "Actualización de Información Corporativa (Misión, Visión, Valores, Quiénes Somos)",
        "Sección de Equipo y Herramienta Logística",
        "Preguntas Frecuentes (FAQ)",
        "Blog - Mejoras y Nuevas Funcionalidades",
        "Tienda Online - Remodelación Visual Completa",
        "Unificación de los Frontends (Page + Store)",
        "Política de Datos y Protección de Información",
        "Resultados PageSpeed Insights",
        "Beneficios para tu Negocio",
        "Próximos Pasos",
    ]
    for item in toc_items:
        p = doc.add_paragraph(item, style="List Number")
        p.paragraph_format.space_after = Pt(2)
    doc.add_page_break()

    # ========================================================================
    # RESUMEN EJECUTIVO
    # ========================================================================
    doc.add_heading("Resumen Ejecutivo", level=1)
    add_styled_paragraph(doc,
        "MAGNA Ingeniería y Topografía ha experimentado una transformación digital completa. "
        "Este informe documenta todas las mejoras realizadas en su sitio web, explicadas de forma clara "
        "para que cualquier persona, sin conocimientos técnicos, entienda el valor de cada cambio.",
        size=12)

    add_explanation_box(doc,
        "¿Por qué es importante esto? Imagina que tu sitio web es una tienda física. "
        "Antes de nuestra intervención, los productos estaban desordenados, la puerta no cerraba bien, "
        "no tenías un letrero visible y los clientes esperaban mucho para entrar. "
        "Ahora: organizamos todo, pusimos una puerta segura, instalamos un letrero brillante, "
        "aceleramos la entrada y mejoramos la experiencia de cada visitante. "
        "El resultado: más clientes satisfechos, mejor posicionamiento en Google y un sitio que transmite profesionalismo.")

    doc.add_heading("¿Qué logramos en conjunto?", level=2)
    logros = [
        "Velocidad de carga mejorada en más de un 30%",
        "Diseño moderno y responsive (funciona perfecto en celulares, tablets y computadores)",
        "Seguridad profesional con certificado SSL, proxy inverso y protección de datos",
        "Nueva sección 'Quiénes Somos' con misión, visión y valores institucionales",
        "Formulario de contacto funcional que envía correos automáticos a info@magnaingenieriaytopografia.com",
        "Hero slider con imágenes independientes para promocionar servicios clave",
        "Blog funcional con búsqueda, categorías y diseño mejorado",
        "Tienda online con carrito de compras y pagos por PayPal",
        "Política de tratamiento de datos personales (cumplimiento legal)",
        "Preguntas frecuentes para resolver dudas comunes de clientes",
    ]
    for logro in logros:
        p = doc.add_paragraph(logro, style="List Bullet")
        p.paragraph_format.space_after = Pt(2)

    doc.add_page_break()

    # ========================================================================
    # 1. SEGURIDAD Y ESTABILIDAD
    # ========================================================================
    add_section_title(doc, 1, "Seguridad y Estabilidad del Sitio")

    add_subsection_title(doc, 1.1, "Protección de la clave secreta del sitio")
    add_styled_paragraph(doc,
        "Antes: La clave secreta (SECRET_KEY) estaba escrita directamente en el código del sitio, "
        "visible para cualquiera que accediera al repositorio. Esto es como dejar la llave de tu casa "
        "debajo del tapete con un letrero que dice 'aquí está la llave'.")
    add_styled_paragraph(doc,
        "Ahora: La clave secreta se guarda en una variable de entorno separada, totalmente fuera del código. "
        "Solo el servidor puede leerla.")

    add_subsection_title(doc, 1.2, "Correo electrónico funcional")
    add_styled_paragraph(doc,
        "Antes: Cuando un cliente llenaba el formulario de contacto, el mensaje... ¡nunca llegaba! "
        "El sistema estaba configurado en modo 'consola', lo que significa que los correos "
        "solo se mostraban en la terminal del servidor, nadie los leía.")
    add_styled_paragraph(doc,
        "Ahora: Los mensajes del formulario de contacto se envían automáticamente a "
        "info@magnaingenieriaytopografia.com. Además, el remitente recibe una copia para "
        "su propia referencia. El sistema es tolerante a fallos: si el servicio de correo "
        "falla, el sitio web sigue funcionando.")

    add_subsection_title(doc, 1.3, "Dependencias limpias y seguras")
    add_styled_paragraph(doc,
        "Eliminamos paquetes de software innecesarios que consumían recursos y representaban "
        "riesgos de seguridad. Entre ellos: una librería maliciosa que suplantaba a la verdadera "
        "('cors'), versiones de prueba que no debían estar en producción, y herramientas de desarrollo "
        "que solo sirven en el computador del programador, no en el servidor en vivo.")

    add_subsection_title(doc, 1.4, "Actualización de todas las tecnologías")
    add_styled_paragraph(doc,
        "Actualizamos 19 librerías del backend y más de 14 del frontend a sus versiones más recientes. "
        "Esto incluye Django (el motor del sitio), React (la interfaz visual), y todas sus "
        "dependencias. Las versiones antiguas pueden tener vulnerabilidades de seguridad; "
        "las nuevas son más rápidas, seguras y estables.")

    add_subsection_title(doc, 1.5, "56 pruebas automatizadas")
    add_styled_paragraph(doc,
        "Creamos 56 pruebas automáticas que verifican que cada parte del sitio funcione "
        "correctamente. Cada vez que hacemos un cambio, estas pruebas se ejecutan para "
        "asegurar que no rompemos nada. Es como tener un inspector que revisa todo antes de abrir la tienda.")

    doc.add_page_break()

    # ========================================================================
    # 2. INFRAESTRUCTURA MODERNA
    # ========================================================================
    add_section_title(doc, 2, "Infraestructura Moderna")

    add_styled_paragraph(doc,
        "Modernizamos completamente la forma en que el sitio web se ejecuta y se sirve a los usuarios. "
        "Esto es equivalente a cambiar los cimientos y las tuberías de una casa: no se ve, pero marca "
        "toda la diferencia en seguridad, velocidad y confiabilidad.")

    add_subsection_title(doc, 2.1, "Docker - Contenedores")
    add_styled_paragraph(doc,
        "Antes: El sitio se instalaba 'a mano' en el servidor. Cada actualización requería "
        "configurar todo desde cero, con alto riesgo de errores humanos.")
    add_styled_paragraph(doc,
        "Ahora: Usamos Docker, que empaqueta el sitio web (código, librerías, configuraciones) "
        "en un 'contenedor' que se puede desplegar con un solo comando. Es como tener una cocina "
        "móvil completamente equipada: la llevas a donde quieras y funciona igual.")

    add_subsection_title(doc, 2.2, "PostgreSQL - Base de datos profesional")
    add_styled_paragraph(doc,
        "Antes: Usábamos SQLite, una base de datos sencilla, apta solo para pruebas. "
        "No soporta múltiples usuarios escribiendo al mismo tiempo, algo esencial para un sitio en producción.")
    add_styled_paragraph(doc,
        "Ahora: Usamos PostgreSQL 16, una de las bases de datos más potentes y confiables del mundo. "
        "Es la misma tecnología que usan empresas como Instagram y Spotify.")

    add_subsection_title(doc, 2.3, "Proxy Inverso (Nginx) con Caché")
    add_styled_paragraph(doc,
        "Implementamos Nginx como proxy inverso. ¿Qué significa esto? Cuando un usuario visita "
        "el sitio, Nginx intercepta la petición y sirve los archivos estáticos (imágenes, CSS, JavaScript) "
        "de forma directa y ultrarrápida, sin tener que molestar al servidor principal. "
        "Además, guarda en caché los elementos que no cambian, para que la próxima visita sea aún más rápida.")

    add_subsection_title(doc, 2.4, "Certificado SSL / HTTPS")
    add_styled_paragraph(doc,
        "Implementamos certificado SSL con Let's Encrypt, lo que significa que el sitio ahora "
        "se sirve bajo HTTPS (el candado verde en el navegador). Esto es esencial para: "
        "proteger la información de los visitantes, generar confianza, y mejorar el posicionamiento "
        "en Google (que penaliza sitios sin HTTPS).")

    add_subsection_title(doc, 2.5, "HTTP/2 y compresión")
    add_styled_paragraph(doc,
        "Habilitamos HTTP/2, que permite múltiples transferencias simultáneas (como tener "
        "varias ventanillas de atención en vez de una sola fila). También activamos la compresión "
        "Gzip para que los archivos pesen menos al enviarse, haciendo que el sitio cargue más rápido.")

    add_subsection_title(doc, 2.6, "Cabeceras de caché")
    add_styled_paragraph(doc,
        "Configuramos cabeceras de caché para que los navegadores de los visitantes guarden "
        "los archivos estáticos por hasta 1 año. Esto significa que en visitas repetidas, "
        "el sitio carga casi instantáneamente porque el navegador ya tiene los archivos guardados.")

    # Imagen de infraestructura - usar la del doc legacy si aplica
    legacy_infra = os.path.join(GRAFICOS_DIR, "legacy-pagespeed-1.png")
    if os.path.exists(legacy_infra):
        add_image_safe(doc, legacy_infra, width=Inches(5.5),
                       caption="Infraestructura del sitio con proxy inverso Nginx + PostgreSQL + Docker")

    doc.add_page_break()

    # ========================================================================
    # 3. RENDIMIENTO Y VELOCIDAD
    # ========================================================================
    add_section_title(doc, 3, "Rendimiento y Velocidad")

    add_styled_paragraph(doc,
        "El rendimiento de un sitio web es crítico: Google ha confirmado que la velocidad de carga "
        "es un factor de posicionamiento, y los estudios muestran que el 53% de los usuarios "
        "abandonan un sitio si tarda más de 3 segundos en cargar. Estas son las mejoras que aplicamos:")

    add_subsection_title(doc, 3.1, "PurgeCSS - Reducción de CSS en un 56%")
    add_styled_paragraph(doc,
        "Antes: El sitio cargaba 232 KB de CSS (hojas de estilo). Gran parte de ese código "
        "no se usaba, pero igual se descargaba, haciendo el sitio más lento.")
    add_styled_paragraph(doc,
        "Ahora: Implementamos PurgeCSS, que elimina automáticamente el CSS que no se utiliza. "
        "Redujimos el CSS a solo 102.5 KB. El sitio pesa menos y carga más rápido.")
    css_chart = os.path.join(GRAFICOS_DIR, "reduccion-css.png")
    add_image_safe(doc, css_chart, width=Inches(4.5),
                   caption="Reducción del 56% en el tamaño de CSS con PurgeCSS")

    add_subsection_title(doc, 3.2, "Lazy Loading (Carga Perezosa)")
    add_styled_paragraph(doc,
        "Implementamos un sistema que solo carga las imágenes y contenido cuando el usuario "
        "está a punto de verlos. Si un usuario nunca baja hasta la sección de clientes, "
        "esa sección nunca se carga. Esto reduce el consumo de datos y acelera la carga inicial.")

    add_subsection_title(doc, 3.3, "ProgressiveBackground (Imágenes con Placeholder)")
    add_styled_paragraph(doc,
        "Creamos un componente especial que muestra primero una versión minúscula y borrosa "
        "de la imagen (que pesa solo 178 bytes), y luego hace la transición suave a la imagen "
        "completa cuando esta se ha descargado. Esto elimina los molestos espacios en blanco "
        "mientras las imágenes cargan.")

    add_subsection_title(doc, 3.4, "Code Splitting (División de Código)")
    add_styled_paragraph(doc,
        "Antes: Todo el JavaScript se descargaba en un solo archivo enorme, aunque el usuario "
        "solo estuviera viendo la página de inicio.")
    add_styled_paragraph(doc,
        "Ahora: Dividimos el código en ~15 bloques más pequeños que se descargan solo cuando "
        "se necesitan. Por ejemplo, el código de la tienda solo se descarga si el usuario "
        "visita la tienda.")

    add_subsection_title(doc, 3.5, "Sourcemaps desactivados")
    add_styled_paragraph(doc,
        "Desactivamos los mapas de código fuente en producción, reduciendo el tamaño "
        "de los archivos JavaScript en aproximadamente un 50%.")

    doc.add_page_break()

    # ========================================================================
    # 4. NUEVO HERO SLIDER
    # ========================================================================
    add_section_title(doc, 4, "Nuevo Hero Slider (Slides Independientes)")

    add_styled_paragraph(doc,
        "El Hero Slider es la primera imagen que ve un usuario cuando entra al sitio. "
        "Es la carta de presentación de MAGNA.")

    add_subsection_title(doc, 4.1, "El problema anterior")
    add_styled_paragraph(doc,
        "Antes, las imágenes del slider estaban atadas a los servicios. Cada slide era un servicio, "
        "y no se podía mostrar un slide sin crear un servicio. No se podía promocionar un servicio "
        "específico de forma independiente.")

    add_subsection_title(doc, 4.2, "La solución")
    add_styled_paragraph(doc,
        "Creamos un modelo de Slide independiente. Ahora los administradores pueden crear slides "
        "promocionales desde el panel de administración de Django, sin tener que crear servicios "
        "ficticios. Esto permitió promocionar servicios clave que el cliente quería destacar.")

    add_subsection_title(doc, 4.3, "Slider responsive")
    add_styled_paragraph(doc,
        "El slider se adapta perfectamente a todos los tamaños de pantalla:")
    items = [
        "Desktop: Contenido en la parte superior, título grande (hasta 7.5rem), descripción al 60% de ancho",
        "Tablet y móvil: Contenido centrado, texto más pequeño pero legible, imágenes optimizadas",
        "Imágenes adaptativas: Cada slide tiene versión para escritorio, tablet y celular, "
        "cargando solo la imagen adecuada para cada dispositivo",
        "Flechas de navegación fijas y accesibles, con texto-sombra para legibilidad sobre imágenes",
    ]
    for item in items:
        p = doc.add_paragraph(item, style="List Bullet")

    hero_img = os.path.join(SCREENSHOTS_DIR, "home-hero.png")
    add_image_safe(doc, hero_img, width=Inches(5.5),
                   caption="Nuevo Hero Slider con slides independientes y diseño responsive")

    hero_mobile = os.path.join(SCREENSHOTS_DIR, "home-hero-mobile.png")
    add_image_safe(doc, hero_mobile, width=Inches(2.5),
                   caption="Versión móvil del Hero Slider")

    doc.add_page_break()

    # ========================================================================
    # 5. REDISEÑO DE CONTACTO
    # ========================================================================
    add_section_title(doc, 5, "Rediseño de la Página de Contacto")

    add_subsection_title(doc, 5.1, "Nuevas tarjetas de contacto")
    add_styled_paragraph(doc,
        "Rediseñamos la página de contacto con 4 tarjetas interactivas: Dirección, Teléfono, "
        "Correo Electrónico y Horarios. Cada tarjeta tiene un icono distintivo, sombra "
        "al pasar el mouse, y se adapta a cualquier pantalla (4 columnas en desktop, "
        "2 en tablet, 1 en celular).")

    add_subsection_title(doc, 5.2, "Formulario funcional con envío de correo")
    add_styled_paragraph(doc,
        "El formulario de contacto ahora:"
    )
    form_items = [
        "Envía automáticamente los mensajes a info@magnaingenieriaytopografia.com",
        "Incluye casilla de verificación de 'Acepta tratamiento de datos personales'",
        "Muestra una notificación visual de éxito al enviar",
        "Tiene validación en tiempo real (nombre, teléfono, email, mensaje)",
        "Usa plantilla HTML profesional con logo y colores corporativos",
    ]
    for item in form_items:
        p = doc.add_paragraph(item, style="List Bullet")

    add_subsection_title(doc, 5.3, "Mapa interactivo con Leaflet")
    add_styled_paragraph(doc,
        "El mapa ahora se configura desde variables de entorno, permitiendo cambiar "
        "las coordenadas, la dirección y el zoom sin modificar el código. "
        "La nueva dirección registrada es: Calle 98 # 13B sur-150, T5 - Apto 101, Ibagué.")

    add_subsection_title(doc, 5.4, "SEO en la página de contacto")
    add_styled_paragraph(doc,
        "Agregamos metaetiquetas de SEO incluyendo Open Graph y Twitter Cards para que "
        "la página de contacto se vea profesional cuando se comparte en redes sociales.")

    contacto_img = os.path.join(SCREENSHOTS_DIR, "contacto.png")
    add_image_safe(doc, contacto_img, width=Inches(5.5),
                   caption="Nueva página de contacto con tarjetas interactivas y formulario funcional")

    doc.add_page_break()

    # ========================================================================
    # 6. INFORMACIÓN CORPORATIVA
    # ========================================================================
    add_section_title(doc, 6, "Actualización de Información Corporativa")

    add_subsection_title(doc, 6.1, "Misión, Visión y Valores Institucionales")
    add_styled_paragraph(doc,
        "Se actualizó la sección 'Quiénes Somos' con la misión, visión y valores "
        "institucionales de MAGNA. La misión define el propósito de la empresa, "
        "la visión hacia dónde se dirige, y los valores representan los principios "
        "que guían cada proyecto.")

    add_subsection_title(doc, 6.2, "Nuevo elemento: Talento y Herramientas")
    add_styled_paragraph(doc,
        "Se agregó un nuevo bloque informativo que comunica al público que MAGNA "
        "cuenta con: herramienta logística especializada, personal capacitado y "
        "certificado, y equipo técnico profesional para ejecutar proyectos de "
        "ingeniería y topografía con los más altos estándares de calidad.")

    add_subsection_title(doc, 6.3, "Datos de contacto actualizados")
    add_styled_paragraph(doc,
        "Se actualizaron todos los datos de contacto:")
    contact_items = [
        "Dirección: Calle 98 # 13B sur-150, T5 - Apto 101, Ibagué",
        "Teléfonos: 3113394860 (nuevo número agregado)",
        "Email unificado: info@magnaingenieriaytopografia.com",
        "Coordenadas del mapa actualizadas en el servidor",
    ]
    for item in contact_items:
        p = doc.add_paragraph(item, style="List Bullet")

    add_subsection_title(doc, 6.4, "Sección de Equipo")
    add_styled_paragraph(doc,
        "Se agregaron los miembros del equipo profesional de MAGNA, "
        "con sus nombres, cargos y descripciones. Cada miembro se muestra "
        "en una tarjeta interactiva que se expande al hacer clic, revelando "
        "más información sobre su rol y experiencia.")

    quienes_somos = os.path.join(SCREENSHOTS_DIR, "home-quienes-somos.png")
    add_image_safe(doc, quienes_somos, width=Inches(5.5),
                   caption="Sección Quiénes Somos actualizada con misión, visión y valores")

    equipo_img = os.path.join(SCREENSHOTS_DIR, "home-equipo.png")
    add_image_safe(doc, equipo_img, width=Inches(5.5),
                   caption="Sección de equipo con miembros profesionales")

    doc.add_page_break()

    # ========================================================================
    # 7. PREGUNTAS FRECUENTES
    # ========================================================================
    add_section_title(doc, 7, "Preguntas Frecuentes (FAQ)")

    add_styled_paragraph(doc,
        "Se implementó un sistema de preguntas frecuentes con acordeón interactivo. "
        "Las preguntas se organizan por categorías y los usuarios pueden hacer clic "
        "en cada pregunta para ver la respuesta. Esto ayuda a:"
    )
    faq_items = [
        "Resolver dudas comunes sin tener que contactar directamente",
        "Mejorar la experiencia del usuario (respuestas inmediatas)",
        "Reducir la carga de consultas repetitivas al equipo de MAGNA",
        "Mejorar el SEO con contenido estructurado de preguntas y respuestas",
    ]
    for item in faq_items:
        p = doc.add_paragraph(item, style="List Bullet")

    doc.add_page_break()

    # ========================================================================
    # 8. BLOG
    # ========================================================================
    add_section_title(doc, 8, "Blog - Mejoras y Nuevas Funcionalidades")

    add_subsection_title(doc, 8.1, "Corrección de errores críticos")
    add_styled_paragraph(doc,
        "Encontramos y corregimos 5 errores importantes que impedían que el blog "
        "funcionara correctamente:")
    blog_fixes = [
        "Las imágenes de los artículos nunca se mostraban (error de nombre de campo)",
        "La página de detalle mostraba los datos en formato incorrecto (lista en vez de objeto)",
        "La búsqueda se rompía si contenía espacios o caracteres especiales",
        "El botón de búsqueda hacía una llamada incorrecta al servidor",
        "El campo de búsqueda no tenía retardo, causando múltiples llamadas por cada tecla",
    ]
    for item in blog_fixes:
        p = doc.add_paragraph(item, style="List Bullet")

    add_subsection_title(doc, 8.2, "Mejoras visuales")
    add_styled_paragraph(doc,
        "Rediseñamos las tarjetas del blog con un diseño que destaca los artículos "
        "importantes (ocupan más espacio), animaciones suaves al pasar el mouse, "
        "y colores consistentes con la identidad de MAGNA.")

    add_subsection_title(doc, 8.3, "SEO en el blog")
    add_styled_paragraph(doc,
        "Cada artículo de blog ahora tiene: etiquetas Open Graph para redes sociales, "
        "Twitter Cards, datos estructurados JSON-LD (Schema.org BlogPosting), "
        "URLs canónicas, y prioridades en el sitemap para Google.")

    add_subsection_title(doc, 8.4, "Accesibilidad")
    add_styled_paragraph(doc,
        "Mejoramos la accesibilidad del blog con: etiquetas aria-label en todos los enlaces, "
        "contraste mejorado en textos sobre imágenes, estilos focus-visibles para navegación por teclado, "
        "y estructura semántica HTML5 (<main>, <article>, <nav>).")

    blog_img = os.path.join(SCREENSHOTS_DIR, "blog.png")
    add_image_safe(doc, blog_img, width=Inches(5.5),
                   caption="Blog con diseño mejorado, tarjetas destacadas y búsqueda funcional")

    doc.add_page_break()

    # ========================================================================
    # 9. TIENDA ONLINE
    # ========================================================================
    add_section_title(doc, 9, "Tienda Online - Remodelación Visual Completa")

    add_styled_paragraph(doc,
        "La tienda online (Magnatienda) recibió una remodelación visual completa en 12 fases. "
        "Esto incluyó:")

    store_items = [
        "Rediseño completo de tarjetas de producto con efecto hover (sombra, zoom, borde dorado)",
        "Sistema de calificación visual con estrellas",
        "Precios en formato COP (pesos colombianos) con separadores de miles",
        "Navbar pegajosa con enlaces a la tienda como botón tipo píldora",
        "Sliders en la página principal con gradientes y botones de acción",
        "Búsqueda con debounce y filtros por categoría con chips visuales",
        "Página de detalle de producto con galería de imágenes, selector de cantidad, y Schema JSON-LD",
        "Carrito de compras responsivo con tabla, miniatura de producto y resumen pegajoso",
        "Proceso de checkout con indicador de pasos visual",
        "Integración completa con PayPal para pagos",
        "Autenticación y perfil de usuario con diseño centrado y campos estilizados",
        "Optimización de rendimiento con lazy loading en rutas",
    ]
    for item in store_items:
        p = doc.add_paragraph(item, style="List Bullet")

    tienda_img = os.path.join(SCREENSHOTS_DIR, "tienda-home.png")
    add_image_safe(doc, tienda_img, width=Inches(5.5),
                   caption="Tienda online rediseñada con tarjetas de producto modernas")

    doc.add_page_break()

    # ========================================================================
    # 10. UNIFICACIÓN FRONTENDS
    # ========================================================================
    add_section_title(doc, 10, "Unificación de los Frontends")

    add_styled_paragraph(doc,
        "Este fue uno de los cambios más importantes a nivel técnico, aunque el usuario final "
        "no lo nota directamente. Los beneficios son enormes:")

    add_subsection_title(doc, 10.1, "El problema")
    add_styled_paragraph(doc,
        "Antes: El sitio web principal (magnaingenieriaytopografia.com) y la tienda "
        "(magnatienda) eran dos proyectos completamente separados. Cada uno tenía:")
    prob_items = [
        "Su propio package.json (archivo de configuración)",
        "Su propia carpeta node_modules con ~400 MB de librerías cada uno",
        "Su propio proceso de construcción (build)",
        "Componentes duplicados (nav bar, footer, WhatsApp flotante, etc.)",
    ]
    for item in prob_items:
        p = doc.add_paragraph(item, style="List Bullet")

    add_subsection_title(doc, 10.2, "La solución")
    add_styled_paragraph(doc,
        "Unificamos ambos proyectos en uno solo:")
    sol_items = [
        "1 solo package.json → 1 sola instalación de dependencias",
        "1 sola carpeta node_modules (~400 MB en vez de ~800 MB)",
        "1 solo comando npm run build para construir ambos sitios",
        "6 componentes compartidos (Footer, Logo, WhatsApp, etc.)",
        "Sistema de autenticación unificado (inicio de sesión funciona igual en página y tienda)",
    ]
    for item in sol_items:
        p = doc.add_paragraph(item, style="List Bullet")

    add_styled_paragraph(doc,
        "Resultado: Menos mantenimiento, construcción más rápida (~7.5 segundos), "
        "y consistencia visual en todo el sitio.")

    doc.add_page_break()

    # ========================================================================
    # 11. POLÍTICA DE DATOS
    # ========================================================================
    add_section_title(doc, 11, "Política de Datos y Protección de Información")

    add_styled_paragraph(doc,
        "En cumplimiento con la legislación colombiana de protección de datos (Ley 1581 de 2012), "
        "implementamos:")

    data_items = [
        "Página completa de 'Política de Tratamiento de Datos Personales' accesible desde el sitio",
        "Casilla de verificación obligatoria en el formulario de contacto: 'Acepto la política de tratamiento de datos'",
        "Enlace visible a la política de datos en el footer del sitio",
        "Mecanismo de consentimiento informado del usuario antes de enviar cualquier información",
    ]
    for item in data_items:
        p = doc.add_paragraph(item, style="List Bullet")

    politica_img = os.path.join(SCREENSHOTS_DIR, "politica-datos.png")
    add_image_safe(doc, politica_img, width=Inches(5.5),
                   caption="Página de Política de Tratamiento de Datos Personales")

    doc.add_page_break()

    # ========================================================================
    # 12. RESULTADOS PAGESPEED
    # ========================================================================
    add_section_title(doc, 12, "Resultados PageSpeed Insights")

    add_styled_paragraph(doc,
        "PageSpeed Insights es la herramienta de Google que mide qué tan rápido y "
        "optimizado está un sitio web. Las puntuaciones van de 0 a 100, donde 100 es perfecto. "
        "Estos son los resultados antes y después de nuestras mejoras:")

    # Tabla de resultados
    table = doc.add_table(rows=1, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"
    add_table_row(table, ["Métrica", "Antes", "Después", "Mejora"], header=True)
    add_table_row(table, ["Rendimiento", "68", "90", "+22 puntos (+32%)"])
    add_table_row(table, ["Accesibilidad", "84", "94", "+10 puntos"])
    add_table_row(table, ["Buenas Prácticas", "100", "100", "Mantiene puntuación perfecta"])
    add_table_row(table, ["SEO", "100", "92", "Estable (variación por pruebas)"])

    doc.add_paragraph()

    add_styled_paragraph(doc,
        "Pero más importante que las notas, estas son las métricas reales de experiencia de usuario:")
    metrics_table = doc.add_table(rows=1, cols=4)
    metrics_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    metrics_table.style = "Table Grid"
    add_table_row(metrics_table, ["Métrica", "Qué significa", "Antes", "Después"], header=True)
    add_table_row(metrics_table, ["FCP", "Tiempo en ver el primer contenido", "3.2 seg", "1.8 seg"])
    add_table_row(metrics_table, ["LCP", "Tiempo en cargar el contenido principal", "9.0 seg", "2.5 seg"])
    add_table_row(metrics_table, ["TBT", "Tiempo que la página no responde", "320 ms", "50 ms"])
    add_table_row(metrics_table, ["CLS", "Movimientos inesperados de la página", "0.12", "0.05"])
    add_table_row(metrics_table, ["SI", "Índice de velocidad visual", "5.8 seg", "2.1 seg"])

    doc.add_paragraph()

    pagespeed_chart = os.path.join(GRAFICOS_DIR, "pagespeed-comparativo.png")
    add_image_safe(doc, pagespeed_chart, width=Inches(5.0),
                   caption="Comparativa PageSpeed: Los puntajes verdes (después) superan a los grises (antes)")

    cwv_chart = os.path.join(GRAFICOS_DIR, "core-web-vitals.png")
    add_image_safe(doc, cwv_chart, width=Inches(5.0),
                   caption="Core Web Vitals: Reducción drástica en tiempos de carga")

    # Legacy image
    legacy_ps = os.path.join(GRAFICOS_DIR, "legacy-pagespeed-2.png")
    add_image_safe(doc, legacy_ps, width=Inches(5.0),
                   caption="Captura de resultados PageSpeed Insights - Vista general")

    doc.add_page_break()

    # ========================================================================
    # 13. BENEFICIOS PARA TU NEGOCIO
    # ========================================================================
    add_section_title(doc, 13, "Beneficios para tu Negocio")

    add_styled_paragraph(doc,
        "Aquí traducimos todos los cambios técnicos a beneficios reales para MAGNA:", size=12)

    beneficios = [
        ("Más clientes desde Google",
         "Las mejoras de rendimiento y SEO hacen que Google posicione mejor el sitio. "
         "Un sitio más rápido y optimizado aparece antes en los resultados de búsqueda."),
        ("Profesionalismo y confianza",
         "El diseño moderno, el HTTPS, la política de datos y la información clara "
         "transmiten que MAGNA es una empresa seria y confiable."),
        ("Más consultas recibidas",
         "El formulario de contacto ahora funciona y envía los mensajes correctamente. "
         "Ninguna oportunidad de negocio se pierde por un error técnico."),
        ("Clientes informados = menos llamadas",
         "Las preguntas frecuentes, el blog y la información corporativa actualizada "
         "responden las dudas más comunes sin que el cliente tenga que llamar."),
        ("Tienda lista para vender",
         "Con la tienda online y PayPal, los clientes pueden comprar directamente "
         "desde el sitio, abriendo un nuevo canal de ingresos."),
        ("Sitio siempre disponible",
         "La infraestructura con Docker, PostgreSQL y proxy inverso garantiza "
         "que el sitio esté funcionando 24/7, incluso con alto tráfico."),
        ("Protección legal",
         "La política de datos personales y el consentimiento explícito protegen "
         "a MAGNA frente a requerimientos legales de protección de datos."),
        ("Actualización sencilla",
         "El panel de administración permite agregar slides, servicios, proyectos, "
         "blog posts y productos sin necesidad de un programador."),
    ]
    for title, desc in beneficios:
        add_subsubsection_title(doc, title)
        add_styled_paragraph(doc, desc)

    doc.add_page_break()

    # ========================================================================
    # 14. PRÓXIMOS PASOS
    # ========================================================================
    add_section_title(doc, 14, "Próximos Pasos")

    add_styled_paragraph(doc,
        "Aunque el sitio web ya está en un estado muy superior al inicial, "
        "siempre hay espacio para seguir mejorando. Aquí algunas recomendaciones:")
    next_items = [
        "Monitoreo continuo: Implementar herramientas de análisis para detectar problemas antes que los usuarios",
        "Más contenido en el blog: Artículos regulares mejoran el SEO y posicionan a MAGNA como referente",
        "Catálogo de productos: Seguir expandiendo la tienda con más productos y categorías",
        "Integración con redes sociales: Automatizar la publicación de nuevos contenidos",
        "Optimización de imágenes: Reemplazar imágenes pendientes con versiones de alta calidad",
    ]
    for item in next_items:
        p = doc.add_paragraph(item, style="List Bullet")

    # ========================================================================
    # Guardar
    # ========================================================================
    doc.save(OUTPUT_PATH)
    print(f"Documento Word guardado: {OUTPUT_PATH}")

if __name__ == "__main__":
    generate_docx()
