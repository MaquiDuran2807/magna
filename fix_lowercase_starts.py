"""
Script para buscar y corregir párrafos que empiezan con minúscula en toda la base de datos
y en archivos fuente del frontend. Convierte la primera letra de cada párrafo a mayúscula.

Un "párrafo" se define como texto separado por DOBLE salto de línea (\n\n) o al inicio del string.
Solo aplica a texto natural (no código).

Uso:
    python fix_lowercase_starts.py           # Modo dry-run (solo muestra)
    python fix_lowercase_starts.py --apply   # Aplica cambios
"""

import re
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'magna_web.settings.dev')
django.setup()

from django.apps import apps


TEXT_FIELDS = [
    ('servicios', 'Servicio', ['nombre', 'descripcion']),
    ('servicios', 'SubServicio', ['nombre', 'descripcion']),
    ('servicios', 'Characteristic', ['nombre', 'descripcion']),
    ('servicios', 'Slide', ['nombre', 'descripcion']),
    ('frequentQuestions', 'Pregunta', ['pregunta', 'respuesta']),
    ('about', 'About', ['descripcion', 'mision', 'vision']),
    ('about', 'Valor', ['nombre', 'descripcion']),
    ('blog', 'Post', ['titulo', 'contenido']),
    ('products', 'Product', ['nombre', 'descripcion']),
    ('proyectos', 'Proyecto', ['nombre', 'descripcion']),
    ('equipos', 'Worker', ['nombre', 'cargo', 'descripcion']),
]

FRONTEND_DIRS = [
    os.path.join(os.path.dirname(__file__), 'magna-page', 'page', 'src'),
]

SKIP_DIRS = ['node_modules', 'dist', '.vite']

# Match a paragraph start: after two newlines, or start of string, followed by optional whitespace,
# then a lowercase letter (including Spanish accented)
PARAGRAPH_START_RE = re.compile(r'(?:^|\n\n)(\s*)([a-záéíóúüñ])')


def fix_paragraph_starts(text):
    """Uppercase the first letter of each paragraph in the text."""
    if not text:
        return text
    return PARAGRAPH_START_RE.sub(lambda m: m.group(1) + m.group(2).upper(), text)


def check_db(dry_run=True):
    print(f"\n{'='*60}")
    print(f"REVISANDO BASE DE DATOS")
    print(f"{'='*60}")
    changes = []
    for app_label, model_name, fields in TEXT_FIELDS:
        try:
            model = apps.get_model(app_label, model_name)
        except LookupError:
            continue
        qs = model.objects.all()
        for obj in qs:
            for field_name in fields:
                val = getattr(obj, field_name, None)
                if not val or not isinstance(val, str):
                    continue
                fixed = fix_paragraph_starts(val)
                if fixed != val:
                    pk = obj.pk
                    print(f"  [{app_label}.{model_name} pk={pk}] {field_name}")
                    print(f"    ANTES:  {repr(val[:120])}")
                    print(f"    DESPUÉS: {repr(fixed[:120])}")
                    print()
                    changes.append((obj, field_name, fixed))
    return changes


def apply_db_changes(changes):
    print(f"\nAplicando {len(changes)} cambios en la base de datos...")
    updated_objects = {}
    for obj, field_name, fixed in changes:
        key = (type(obj), obj.pk)
        if key not in updated_objects:
            updated_objects[key] = set()
        updated_objects[key].add((field_name, fixed))

    for (cls, pk), fields in updated_objects.items():
        instance = cls.objects.get(pk=pk)
        for field_name, fixed in fields:
            setattr(instance, field_name, fixed)
        instance.save()
        print(f"  Actualizado {cls.__name__} pk={pk}")


def check_frontend(dry_run=True):
    print(f"\n{'='*60}")
    print(f"REVISANDO ARCHIVOS DEL FRONTEND (solo texto en JSX o strings literales)")
    print(f"{'='*60}")
    changes = []

    # Pattern to find JSX text content or quoted Spanish strings
    # Look for: text between > and < (JSX children), or quoted strings with Spanish content
    # This pattern finds JSX text nodes: >text with lowercase start...<
    jsx_text_re = re.compile(r'>\s*([a-záéíóúüñ][^<]*?)\s*<')

    for frontend_dir in FRONTEND_DIRS:
        for root, dirs, files in os.walk(frontend_dir):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for f in files:
                if not f.endswith(('.tsx', '.ts', '.jsx', '.js')):
                    continue
                filepath = os.path.join(root, f)
                relpath = os.path.relpath(filepath, os.path.dirname(__file__))

                with open(filepath, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()

                # Find all JSX text nodes that start with lowercase
                modified = False
                new_content = content

                for match in jsx_text_re.finditer(content):
                    full_text = match.group(0)
                    inner_text = match.group(1)
                    fixed_inner = fix_paragraph_starts(inner_text)
                    if fixed_inner != inner_text:
                        old = f'>{inner_text}<'
                        new = f'>{fixed_inner}<'
                        if old in new_content:
                            new_content = new_content.replace(old, new, 1)
                            modified = True
                            print(f"  {relpath}:")
                            print(f"    ANTES:  >{inner_text[:100]}<")
                            print(f"    DESPUÉS: >{fixed_inner[:100]}<")
                            print()

                if modified:
                    changes.append(filepath)
                    if not dry_run:
                        with open(filepath, 'w', encoding='utf-8') as fh:
                            fh.write(new_content)
                        print(f"  >>> Archivo actualizado: {relpath}")

    return changes


def main():
    dry_run = '--apply' not in sys.argv

    if dry_run:
        print("Modo DRY-RUN (solo muestra). Usa --apply para aplicar los cambios.")
    else:
        print("Modo APLICAR. Se modificarán los datos.")

    db_changes = check_db(dry_run)

    if not dry_run and db_changes:
        apply_db_changes(db_changes)

    frontend_changes = check_frontend(dry_run)

    print(f"\n{'='*60}")
    print(f"RESUMEN")
    print(f"{'='*60}")
    print(f"  DB: {len(db_changes)} cambios {'(simulados)' if dry_run else 'aplicados'}")
    print(f"  Frontend: {len(frontend_changes)} archivos {'(simulados)' if dry_run else 'modificados'}")

    if dry_run and (db_changes or frontend_changes):
        print(f"\nEjecuta con --apply para aplicar los cambios.")


if __name__ == '__main__':
    main()
