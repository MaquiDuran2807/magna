import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import numpy as np
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "graficos")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Colores corporativos Magna
NAVY = "#1a365d"
GOLD = "#d69e2e"
DARK_GRAY = "#2d3748"
LIGHT_GRAY = "#e2e8f0"
GREEN = "#38a169"
RED = "#e53e3e"

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 12,
    "axes.titlesize": 16,
    "axes.labelsize": 13,
})

def generar_grafico_pagespeed():
    categorias = ["Rendimiento", "Accesibilidad", "Buenas Prácticas", "SEO"]
    antes = [68, 84, 100, 100]
    despues = [90, 94, 100, 92]

    x = np.arange(len(categorias))
    width = 0.35

    fig, ax = plt.subplots(figsize=(10, 6))
    fig.patch.set_facecolor("white")

    bars1 = ax.bar(x - width / 2, antes, width, label="Antes", color=LIGHT_GRAY, edgecolor=DARK_GRAY, linewidth=1.2)
    bars2 = ax.bar(x + width / 2, despues, width, label="Después", color=GOLD, edgecolor=NAVY, linewidth=1.2)

    for bar in bars1:
        h = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, h + 1, f"{int(h)}", ha="center", va="bottom", fontweight="bold", color=DARK_GRAY, fontsize=11)

    for bar in bars2:
        h = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, h + 1, f"{int(h)}", ha="center", va="bottom", fontweight="bold", color=NAVY, fontsize=11)

    # Flechas de mejora
    for i, (a, d) in enumerate(zip(antes, despues)):
        if d > a:
            ax.annotate(f"+{d - a} pts", (x[i] + width / 2, d), (x[i] + width / 2, d + 6),
                        ha="center", fontsize=10, color=GREEN, fontweight="bold",
                        arrowprops=dict(arrowstyle="->", color=GREEN, lw=1.5))

    ax.set_ylabel("Puntuación")
    ax.set_title("PageSpeed Insights - Comparativa Antes vs Después", fontweight="bold", pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(categorias)
    ax.set_ylim(0, 110)
    ax.legend(loc="upper right", framealpha=0.9, edgecolor=DARK_GRAY)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.yaxis.set_major_locator(mticker.MultipleLocator(10))

    for label in ax.get_yticklabels():
        label.set_fontsize(10)

    plt.tight_layout()
    path = os.path.join(OUTPUT_DIR, "pagespeed-comparativo.png")
    plt.savefig(path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"  Gráfico guardado: pagespeed-comparativo.png")


def generar_grafico_cwv():
    metrics = ["FCP\n(seg)", "LCP\n(seg)", "TBT\n(ms)", "CLS", "SI\n(seg)"]
    antes_values = [3.2, 9.0, 320, 0.12, 5.8]
    despues_values = [1.8, 2.5, 50, 0.05, 2.1]

    x = np.arange(len(metrics))
    width = 0.35

    fig, ax = plt.subplots(figsize=(10, 6))
    fig.patch.set_facecolor("white")

    bars1 = ax.bar(x - width / 2, antes_values, width, label="Antes", color=RED, alpha=0.7, edgecolor=DARK_GRAY, linewidth=1.2)
    bars2 = ax.bar(x + width / 2, despues_values, width, label="Después", color=GREEN, alpha=0.8, edgecolor=NAVY, linewidth=1.2)

    for bar in bars1:
        h = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, h + 0.1, f"{h:.1f}", ha="center", va="bottom", fontsize=10, fontweight="bold", color=RED)

    for bar in bars2:
        h = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, h + 0.1, f"{h:.1f}", ha="center", va="bottom", fontsize=10, fontweight="bold", color=GREEN)

    for i, (a, d) in enumerate(zip(antes_values, despues_values)):
        if a > 0:
            pct = int((1 - d / a) * 100)
            ax.annotate(f"-{pct}%", (x[i] + width / 2, d), (x[i] + width / 2, d + max(antes_values) * 0.08),
                        ha="center", fontsize=10, color=GREEN, fontweight="bold")

    ax.set_ylabel("Valor")
    ax.set_title("Core Web Vitals - Antes vs Después", fontweight="bold", pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(metrics)
    ax.legend(loc="upper right", framealpha=0.9, edgecolor=DARK_GRAY)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    plt.tight_layout()
    path = os.path.join(OUTPUT_DIR, "core-web-vitals.png")
    plt.savefig(path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"  Gráfico guardado: core-web-vitals.png")


def generar_grafico_reduccion_css():
    labels = ["CSS Original", "CSS Optimizado"]
    sizes = [232, 102.5]
    colors = [RED, GREEN]

    fig, ax = plt.subplots(figsize=(6, 5))
    fig.patch.set_facecolor("white")

    bars = ax.bar(labels, sizes, color=colors, edgecolor=DARK_GRAY, linewidth=1.2, width=0.5)

    for bar, size in zip(bars, sizes):
        h = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, h + 2, f"{size} KB\n({int((1 - size / max(sizes)) * 100)}% menos)",
                ha="center", va="bottom", fontsize=12, fontweight="bold")

    ax.set_ylabel("Tamaño (KB)")
    ax.set_title("Reducción de CSS con PurgeCSS", fontweight="bold", pad=20)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    pct = int((1 - 102.5 / 232) * 100)
    ax.text(0.5, -0.15, f"¡Reducción del {pct}%! De 232 KB a 102.5 KB", transform=ax.transAxes,
            ha="center", fontsize=13, fontweight="bold", color=NAVY)

    plt.tight_layout()
    path = os.path.join(OUTPUT_DIR, "reduccion-css.png")
    plt.savefig(path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"  Gráfico guardado: reduccion-css.png")


def generar_todos():
    print("Generando gráficos...")
    generar_grafico_pagespeed()
    generar_grafico_cwv()
    generar_grafico_reduccion_css()
    print("Gráficos generados correctamente.")

if __name__ == "__main__":
    generar_todos()
