"""
Orquestador principal: genera el informe completo para el cliente.

Ejecuta en orden:
1. tomar_screenshots.py  - Captura screenshots del sitio en vivo
2. generar_graficos.py   - Genera gráficos comparativos
3. generar_docx.py       - Genera documento Word
4. generar_pptx.py       - Genera presentación PowerPoint

Uso:
    python generar_informe_cliente.py [--skip-screenshots]
"""

import sys
import os
import subprocess
import time

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))

def run_script(name, description):
    print(f"\n{'='*60}")
    print(f"  {description}...")
    print(f"{'='*60}")
    start = time.time()
    path = os.path.join(SCRIPTS_DIR, name)
    result = subprocess.run([sys.executable, path], capture_output=False, cwd=SCRIPTS_DIR)
    elapsed = time.time() - start
    if result.returncode == 0:
        print(f"  Completado en {elapsed:.1f} segundos")
    else:
        print(f"  ERROR: {name} falló con código {result.returncode}")
        if result.stderr:
            print(result.stderr.decode()[:1000])
    return result.returncode == 0

def main():
    skip_screenshots = "--skip-screenshots" in sys.argv

    print("="*60)
    print("  GENERADOR DE INFORME PARA CLIENTE - MAGNA")
    print("="*60)

    steps = []

    if not skip_screenshots:
        steps.append(("tomar_screenshots.py", "Capturando screenshots del sitio web"))
    else:
        print("\n  [--skip-screenshots] Omitiendo captura de screenshots")

    steps.append(("generar_graficos.py", "Generando gráficos comparativos"))
    steps.append(("generar_docx.py", "Generando documento Word"))
    steps.append(("generar_pptx.py", "Generando presentación PowerPoint"))

    all_ok = True
    for script, desc in steps:
        ok = run_script(script, desc)
        if not ok:
            print(f"  ADVERTENCIA: {script} falló. Continuando con el siguiente...")
            all_ok = False

    print(f"\n{'='*60}")
    if all_ok:
        print("  INFORME GENERADO EXITOSAMENTE")
    else:
        print("  INFORME GENERADO CON ALGUNOS ERRORES")
    print(f"{'='*60}")
    print(f"\nArchivos generados:")
    print(f"  - Screenshots: {os.path.join(SCRIPTS_DIR, 'screenshots')}/")
    print(f"  - Gráficos:   {os.path.join(SCRIPTS_DIR, 'graficos')}/")
    print(f"  - Word:       {os.path.join(SCRIPTS_DIR, 'informe-final.docx')}")
    print(f"  - PowerPoint: {os.path.join(SCRIPTS_DIR, 'presentacion-cliente.pptx')}")

if __name__ == "__main__":
    main()
