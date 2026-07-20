import asyncio
import os
from playwright.async_api import async_playwright

BASE_URL = "https://magnaingenieriaytopografia.com"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    {
        "name": "home-hero",
        "url": BASE_URL,
        "selector": "section",
        "wait": 5000,
    },
    {
        "name": "home-servicios",
        "url": BASE_URL,
        "selector": "text=Servicios",
        "wait": 3000,
    },
    {
        "name": "home-estadisticas",
        "url": BASE_URL,
        "selector": "text=Clientes",
        "wait": 3000,
    },
    {
        "name": "home-logos-clientes",
        "url": BASE_URL,
        "selector": "text=Confían",
        "wait": 3000,
    },
    {
        "name": "home-equipo",
        "url": BASE_URL,
        "selector": "text=Equipo",
        "wait": 3000,
    },
    {
        "name": "home-quienes-somos",
        "url": BASE_URL,
        "selector": "text=Experiencia",
        "wait": 3000,
    },
    {
        "name": "home-footer",
        "url": BASE_URL,
        "selector": "footer",
        "wait": 2000,
    },
    {
        "name": "proyectos",
        "url": f"{BASE_URL}/proyectos",
        "selector": "main",
        "wait": 4000,
    },
    {
        "name": "blog",
        "url": f"{BASE_URL}/blog",
        "selector": "main",
        "wait": 4000,
    },
    {
        "name": "contacto",
        "url": f"{BASE_URL}/contacto",
        "selector": "main",
        "wait": 4000,
    },
    {
        "name": "politica-datos",
        "url": f"{BASE_URL}/politica-de-datos",
        "selector": "main",
        "wait": 3000,
    },
    {
        "name": "servicio-detalle",
        "url": f"{BASE_URL}/servicios/topografia",
        "selector": "main",
        "wait": 4000,
    },
    {
        "name": "tienda-home",
        "url": f"{BASE_URL}/tienda",
        "selector": "main",
        "wait": 5000,
    },
]

MOBILE_PAGES = [
    {
        "name": "home-hero-mobile",
        "url": BASE_URL,
        "selector": "section",
        "wait": 5000,
    },
]

async def full_page_screenshot(page, name):
    path = os.path.join(OUTPUT_DIR, f"{name}.png")
    await page.screenshot(path=path, full_page=True)
    print(f"  Screenshot guardado: {name}.png")

async def capture_viewport(page, name, selector_text=None):
    path = os.path.join(OUTPUT_DIR, f"{name}.png")
    if selector_text:
        try:
            el = await page.wait_for_selector(selector_text, timeout=8000)
            if el:
                await el.scroll_into_view_if_needed()
                await asyncio.sleep(1)
        except:
            pass
    await page.screenshot(path=path, full_page=False)
    print(f"  Screenshot guardado: {name}.png")

async def take_screenshots():
    print("=== Iniciando captura de screenshots ===")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # Desktop screenshots (1366x768)
        print("\n--- Desktop ---")
        context = await browser.new_context(
            viewport={"width": 1366, "height": 768},
            device_scale_factor=2,
        )
        page = await context.new_page()

        for item in PAGES:
            print(f"  Navegando a: {item['url']}")
            try:
                await page.goto(item["url"], wait_until="networkidle", timeout=30000)
                await asyncio.sleep(item["wait"] / 1000)
                await capture_viewport(page, item["name"], item["selector"])
            except Exception as e:
                print(f"  Error en {item['name']}: {e}")

        await context.close()

        # Mobile screenshots (375x812)
        print("\n--- Mobile ---")
        mobile_context = await browser.new_context(
            viewport={"width": 375, "height": 812},
            device_scale_factor=3,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
        )
        mobile_page = await mobile_context.new_page()

        for item in MOBILE_PAGES:
            print(f"  Navegando a: {item['url']}")
            try:
                await mobile_page.goto(item["url"], wait_until="networkidle", timeout=30000)
                await asyncio.sleep(item["wait"] / 1000)
                await capture_viewport(mobile_page, item["name"], item["selector"])
            except Exception as e:
                print(f"  Error en {item['name']}: {e}")

        await mobile_context.close()
        await browser.close()

    print("\n=== Screenshots completados ===")

if __name__ == "__main__":
    asyncio.run(take_screenshots())
