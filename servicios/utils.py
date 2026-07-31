from PIL import Image as PilImage
from io import BytesIO
from django.core.files.base import ContentFile


def generate_image_variants(imagen_field, tablet_ratio=0.75, celular_ratio=0.5, normalize_height=None):
    pil_img = PilImage.open(imagen_field)
    ancho_original, altura_original = pil_img.size

    if normalize_height:
        proporcion = normalize_height / altura_original
        ancho_normalizado = int(ancho_original * proporcion)
        pil_img = pil_img.resize((ancho_normalizado, normalize_height), PilImage.LANCZOS)
        base_width, base_height = ancho_normalizado, normalize_height
    else:
        base_width, base_height = ancho_original, altura_original

    tablet_size = (int(base_width * tablet_ratio), int(base_height * tablet_ratio))
    celular_size = (int(base_width * celular_ratio), int(base_height * celular_ratio))

    img_tablet = pil_img.resize(tablet_size, PilImage.LANCZOS)
    img_celular = pil_img.resize(celular_size, PilImage.LANCZOS)

    buffer_tablet = BytesIO()
    buffer_celular = BytesIO()

    img_tablet.convert('RGB').save(buffer_tablet, format='WEBP', quality=90)
    img_celular.convert('RGB').save(buffer_celular, format='WEBP', quality=90)

    return (
        ContentFile(buffer_tablet.getvalue()),
        ContentFile(buffer_celular.getvalue()),
    )


def make_variant_filename(original_name, suffix):
    base = original_name.rsplit('.', 1)[0]
    return f'{base}_{suffix}.webp'
