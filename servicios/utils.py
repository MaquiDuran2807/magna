from PIL import Image as PilImage
from io import BytesIO
from django.core.files.base import ContentFile


def generate_image_variants(imagen_field, tablet_ratio=0.75, celular_ratio=0.5, normalize_height=None):
    """
    Genera variantes tablet y celular de una imagen subida.

    Args:
        imagen_field: El ImageField con la imagen original
        tablet_ratio: Factor de reduccion para tablet (0.0 - 1.0)
        celular_ratio: Factor de reduccion para celular (0.0 - 1.0)
        normalize_height: Altura fija a la que normalizar antes de variantes (opcional)

    Returns:
        tuple: (imagen_tablet_content, imagen_celular_content) como ContentFile
    """
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
    """Genera un nombre de archivo para la variante."""
    base = original_name.rsplit('.', 1)[0]
    return f'{base}_{suffix}.webp'
