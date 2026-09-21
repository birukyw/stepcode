import os
import math
import random
from PIL import Image, ImageDraw

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 384, 216
SCALE = 4

def save_scaled(img, filename):
    upscaled = img.resize((W * SCALE, H * SCALE), Image.Resampling.NEAREST)
    out_path = os.path.join(OUTPUT_DIR, filename)
    upscaled.save(out_path, format='PNG')
    print(f"Saved: {out_path} ({upscaled.size})")

# 1. PYTHON: Emerald Serpent Jungle & Ancient Temple
def gen_python():
    img = Image.new('RGB', (W, H), (12, 28, 26))
    draw = ImageDraw.Draw(img)

    # Sky gradient (twilight mint to dark forest)
    for y in range(H):
        t = y / H
        r = int(14 + (34 - 14) * t * (1 - t) * 2)
        g = int(32 + (90 - 32) * t * 0.7)
        b = int(38 + (70 - 38) * (1 - t))
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Pixel stars / fireflies in sky
    import random
    rng = random.Random(42)
    for _ in range(60):
        sx = rng.randint(0, W - 1)
        sy = rng.randint(5, int(H * 0.55))
        c = rng.choice([(140, 240, 180), (180, 255, 220), (90, 180, 140)])
        draw.point((sx, sy), fill=c)

    # Distant mist mountain
    for x in range(W):
        m_h = int(H * 0.45 + math.sin(x * 0.02) * 22 + math.cos(x * 0.05) * 8)
        draw.line([(x, m_h), (x, H)], fill=(20, 52, 48))

    # Midground jungle ridge
    for x in range(W):
        m_h2 = int(H * 0.58 + math.sin(x * 0.035 + 1.2) * 18 + math.sin(x * 0.08) * 6)
        draw.line([(x, m_h2), (x, H)], fill=(28, 72, 60))

    # Ancient Stone Serpent Temple Ruins (Right side)
    tx, ty = int(W * 0.62), int(H * 0.42)
    # Stepped ziggurat
    steps = [
        (tx + 20, ty + 60, 110, 45, (45, 95, 75)),
        (tx + 32, ty + 40, 86, 25, (55, 115, 90)),
        (tx + 44, ty + 20, 62, 22, (68, 138, 108)),
        (tx + 56, ty + 5, 38, 18, (80, 160, 125)),
    ]
    for sx, sy, sw, sh, col in steps:
        draw.rectangle([sx, sy, sx + sw, sy + sh], fill=col, outline=(25, 60, 50))
        # Stone brick grid
        for bx in range(sx, sx + sw, 10):
            draw.line([(bx, sy), (bx, sy + sh)], fill=(35, 75, 60))
        for by in range(sy, sy + sh, 6):
            draw.line([(sx, by), (sx + sw, by)], fill=(35, 75, 60))

    # Glowing Sacred Serpent Pillar / Coil (Right side)
    cx, cy = tx + 75, ty + 40
    for ang in range(0, 360, 8):
        rad = math.radians(ang)
        r_outer = 32 + math.sin(ang * 0.1) * 3
        px = int(cx + math.cos(rad) * r_outer)
        py = int(cy + math.sin(rad) * 24)
        draw.rectangle([px - 4, py - 4, px + 4, py + 4], fill=(46, 204, 113), outline=(20, 120, 60))
    # Glowing serpent eye
    draw.rectangle([cx + 28, cy - 2, cx + 32, cy + 2], fill=(255, 235, 59))
    draw.point((cx + 30, cy), fill=(255, 100, 0))

    # Foreground jungle trees & pixel vines
    for x in range(0, W, 22):
        tree_h = int(H * 0.72 + math.sin(x * 0.1) * 12)
        trunk_w = rng.randint(3, 5)
        draw.rectangle([x, tree_h, x + trunk_w, H], fill=(30, 45, 35))
        # Foliage cluster
        foliage_col = rng.choice([(34, 112, 74), (46, 139, 87), (26, 92, 60)])
        draw.ellipse([x - 14, tree_h - 22, x + 18, tree_h + 8], fill=foliage_col, outline=(18, 60, 40))

    # Foreground ground with grass tufts
    draw.rectangle([0, int(H * 0.86), W, H], fill=(18, 48, 38))
    for x in range(0, W, 4):
        gh = rng.randint(3, 8)
        draw.line([(x, int(H * 0.86)), (x, int(H * 0.86) - gh)], fill=(60, 179, 113))

    save_scaled(img, 'python_quest_hero.png')

# 2. JAVA: Floating JVM Citadel & Arcane Stained-Glass Towers
def gen_java():
    img = Image.new('RGB', (W, H), (14, 16, 38))
    draw = ImageDraw.Draw(img)

    # Midnight sky gradient with warm purple haze
    for y in range(H):
        t = y / H
        r = int(18 + 45 * t)
        g = int(20 + 35 * t * (1 - t) * 2)
        b = int(45 + 55 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Pixel moon
    draw.ellipse([W - 75, 20, W - 35, 60], fill=(255, 248, 220))
    draw.ellipse([W - 68, 22, W - 32, 58], fill=(240, 230, 190))

    # Pixel stars
    rng = random.Random(108)
    for _ in range(75):
        sx = rng.randint(0, W - 1)
        sy = rng.randint(4, int(H * 0.6))
        draw.point((sx, sy), fill=rng.choice([(255, 255, 255), (180, 210, 255), (255, 214, 130)]))

    # Distant floating spires silhouette
    for x in range(W):
        h_line = int(H * 0.62 + math.sin(x * 0.03) * 16)
        draw.line([(x, h_line), (x, H)], fill=(28, 32, 65))

    # Grand Floating Citadel on Right
    cx, cy = int(W * 0.68), int(H * 0.38)
    # Island base rock
    island_pts = [
        (cx - 70, cy + 55), (cx - 50, cy + 90), (cx, cy + 110),
        (cx + 60, cy + 95), (cx + 80, cy + 55)
    ]
    draw.polygon(island_pts, fill=(35, 40, 70), outline=(55, 65, 110))

    # Citadel towers
    towers = [
        (cx - 55, cy + 10, 26, 50, (50, 60, 105)),
        (cx - 20, cy - 25, 42, 85, (65, 80, 135)), # Main Spire
        (cx + 30, cy + 5, 28, 55, (50, 60, 105)),
    ]
    for tx, ty, tw, th, col in towers:
        draw.rectangle([tx, ty, tx + tw, ty + th], fill=col, outline=(30, 38, 70))
        # Spire roof triangle
        draw.polygon([(tx, ty), (tx + tw // 2, ty - 22), (tx + tw, ty)], fill=(220, 80, 50), outline=(160, 40, 20))
        # Glowing Arcane Windows (Cyan & Amber)
        for wy in range(ty + 10, ty + th - 8, 12):
            draw.rectangle([tx + 6, wy, tx + 12, wy + 7], fill=(0, 229, 255))
            if tw > 30:
                draw.rectangle([tx + tw - 14, wy, tx + tw - 8, wy + 7], fill=(255, 179, 0))

    # Steaming Golden Rune Cup atop central spire
    cup_x, cup_y = cx + 1, cy - 35
    draw.rectangle([cup_x - 6, cup_y, cup_x + 6, cup_y + 8], fill=(255, 193, 7), outline=(200, 130, 0))
    # Steam particles
    draw.point((cup_x - 2, cup_y - 4), fill=(255, 255, 255))
    draw.point((cup_x + 3, cup_y - 7), fill=(255, 230, 180))
    draw.point((cup_x, cup_y - 10), fill=(200, 230, 255))

    # Foreground arcane stone bridges
    draw.rectangle([0, int(H * 0.84), W, H], fill=(22, 25, 48))
    for x in range(0, W, 18):
        draw.line([(x, int(H * 0.84)), (x, H)], fill=(38, 44, 80))
    # Glowing power lines along bridge
    draw.line([(0, int(H * 0.84)), (W, int(H * 0.84))], fill=(0, 229, 255))

    save_scaled(img, 'java_citadel_hero.png')

# 3. DSA & LEETCODE: Neon Gladiator Colosseum of Algor
def gen_dsa():
    img = Image.new('RGB', (W, H), (10, 12, 28))
    draw = ImageDraw.Draw(img)

    # Cyber dark blue to deep violet arena sky
    for y in range(H):
        t = y / H
        r = int(12 + 35 * t * (1 - t) * 3)
        g = int(14 + 18 * t)
        b = int(32 + 65 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Matrix binary code drizzle in sky
    rng = random.Random(256)
    for col in range(0, W, 12):
        if rng.random() > 0.4:
            start_y = rng.randint(5, 30)
            length = rng.randint(4, 12)
            for i in range(length):
                py = start_y + i * 5
                if py < H * 0.55:
                    col_val = 180 - i * 12
                    draw.point((col, py), fill=(0, max(60, col_val), max(80, col_val + 40)))

    # Colosseum amphitheater curves (Right side)
    arena_x = int(W * 0.65)
    for arc_r in range(120, 40, -18):
        box = [arena_x - arc_r, int(H * 0.22) + (120 - arc_r) // 2, arena_x + arc_r, int(H * 0.85)]
        draw.arc(box, start=180, end=360, fill=(35, 45, 80), width=4)
        # Pillars
        for ang in range(195, 345, 20):
            rad = math.radians(ang)
            px = int(arena_x + math.cos(rad) * arc_r)
            py = int((H * 0.53) + math.sin(rad) * (arc_r * 0.4))
            draw.rectangle([px - 2, py, px + 2, py + 24], fill=(48, 62, 110), outline=(15, 20, 45))

    # Central Arena Platform with glowing battle circle
    draw.ellipse([arena_x - 70, int(H * 0.68), arena_x + 70, int(H * 0.88)], fill=(24, 30, 58), outline=(0, 230, 118), width=2)
    draw.ellipse([arena_x - 45, int(H * 0.72), arena_x + 45, int(H * 0.84)], outline=(0, 229, 255), width=1)

    # Pixel Gladiator with Dual Energy Blades in Arena
    gx, gy = arena_x, int(H * 0.70)
    # Body
    draw.rectangle([gx - 4, gy - 12, gx + 4, gy + 4], fill=(120, 140, 180))
    # Helmet & plume
    draw.rectangle([gx - 3, gy - 18, gx + 3, gy - 12], fill=(200, 220, 255))
    draw.rectangle([gx - 1, gy - 23, gx + 1, gy - 18], fill=(0, 229, 255))
    # Left & Right Cyan glowing swords
    draw.line([(gx - 14, gy - 20), (gx - 5, gy - 6)], fill=(0, 229, 255), width=2)
    draw.line([(gx + 5, gy - 6), (gx + 14, gy - 20)], fill=(0, 230, 118), width=2)

    # Foreground stone tiles
    draw.rectangle([0, int(H * 0.88), W, H], fill=(16, 20, 40))
    for x in range(0, W, 24):
        draw.line([(x, int(H * 0.88)), (x, H)], fill=(30, 38, 70))
        draw.line([(0, int(H * 0.88)), (W, int(H * 0.88))], fill=(0, 230, 118))

    save_scaled(img, 'dsa_colosseum_hero.png')

# 4. WEB & FULLSTACK: Synthwave Cyberpunk Arcade City
def gen_fullstack():
    img = Image.new('RGB', (W, H), (16, 12, 34))
    draw = ImageDraw.Draw(img)

    # Synthwave sunset sky (Magenta to Cyan to Deep Violet)
    for y in range(H):
        t = y / H
        r = int(35 + 85 * (1 - t))
        g = int(12 + 65 * t * (1 - t) * 2)
        b = int(60 + 100 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Distant sunset grid horizon
    horizon_y = int(H * 0.62)
    for y in range(horizon_y, int(H * 0.82), 6):
        draw.line([(0, y), (W, y)], fill=(60, 20, 80))

    # Dense Cyberpunk Skyline on Right
    rng = random.Random(777)
    buildings = [
        (int(W * 0.52), 40, (30, 24, 60), 34),
        (int(W * 0.62), 65, (40, 30, 75), 40),
        (int(W * 0.72), 30, (50, 35, 95), 45), # Tower
        (int(W * 0.84), 55, (35, 28, 70), 38),
        (int(W * 0.92), 75, (28, 22, 55), 32),
    ]
    for bx, bh, bcol, bw in buildings:
        by = horizon_y - bh
        draw.rectangle([bx, by, bx + bw, H], fill=bcol, outline=(70, 50, 120))
        # Pixel glowing windows
        for wx in range(bx + 4, bx + bw - 4, 6):
            for wy in range(by + 8, horizon_y, 8):
                if rng.random() > 0.4:
                    win_col = rng.choice([(255, 0, 128), (0, 229, 255), (255, 214, 0), (180, 100, 255)])
                    draw.point((wx, wy), fill=win_col)

    # Large Neon Hologram Sign atop main tower
    hx, hy = int(W * 0.74), int(H * 0.24)
    draw.rectangle([hx, hy, hx + 40, hy + 14], fill=(20, 15, 45), outline=(255, 0, 128), width=2)
    draw.line([(hx + 5, hy + 7), (hx + 35, hy + 7)], fill=(0, 229, 255), width=2)

    # Flying pixel hover-cars in sky
    draw.rectangle([int(W * 0.56), 72, int(W * 0.61), 75], fill=(0, 229, 255))
    draw.line([(int(W * 0.51), 73), (int(W * 0.56), 73)], fill=(255, 0, 128))
    draw.rectangle([int(W * 0.82), 48, int(W * 0.86), 50], fill=(255, 214, 0))

    # Foreground elevated highway / bridge
    draw.rectangle([0, int(H * 0.82), W, H], fill=(22, 18, 42))
    draw.line([(0, int(H * 0.82)), (W, int(H * 0.82))], fill=(255, 0, 128), width=2)
    # Grid perspective lines
    for x in range(0, W, 28):
        draw.line([(x, int(H * 0.82)), (x - 20, H)], fill=(0, 229, 255))

    save_scaled(img, 'fullstack_arcade_hero.png')

# 5. SYSTEMS & LOW-LEVEL: Mainframe Cyber Core & Silicon Motherboard
def gen_systems():
    img = Image.new('RGB', (W, H), (10, 18, 16))
    draw = ImageDraw.Draw(img)

    # Dark phosphor green tech background
    for y in range(H):
        t = y / H
        r = int(8 + 14 * t)
        g = int(22 + 45 * t * (1 - t) * 3)
        b = int(14 + 20 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Motherboard PCB circuit traces in background
    rng = random.Random(999)
    for _ in range(35):
        cx = rng.randint(int(W * 0.4), W - 10)
        cy = rng.randint(20, H - 20)
        length = rng.randint(20, 60)
        direction = rng.choice(['h', 'v'])
        c_col = rng.choice([(25, 75, 55), (35, 105, 75), (0, 230, 118)])
        if direction == 'h':
            draw.line([(cx, cy), (cx + length, cy)], fill=c_col)
            draw.rectangle([cx + length - 2, cy - 2, cx + length + 2, cy + 2], fill=c_col)
        else:
            draw.line([(cx, cy), (cx, cy + length)], fill=c_col)
            draw.rectangle([cx - 2, cy + length - 2, cx + 2, cy + length + 2], fill=c_col)

    # Massive Central Microchip & Server Rack (Right side)
    chip_x, chip_y = int(W * 0.65), int(H * 0.32)
    chip_w, chip_h = 75, 65
    # Heat sink & chip body
    draw.rectangle([chip_x, chip_y, chip_x + chip_w, chip_y + chip_h], fill=(28, 42, 38), outline=(0, 230, 118), width=2)
    # CPU core die
    draw.rectangle([chip_x + 16, chip_y + 14, chip_x + chip_w - 16, chip_y + chip_h - 14], fill=(16, 28, 24), outline=(255, 179, 0), width=1)
    # Blinking LED indicators
    for lx in range(chip_x + 8, chip_x + chip_w - 8, 10):
        draw.point((lx, chip_y + 6), fill=(0, 255, 128))
        draw.point((lx, chip_y + chip_h - 6), fill=(255, 82, 82))

    # CRT Terminal Monitors beside chip
    mon_x, mon_y = chip_x - 55, chip_y + 10
    draw.rectangle([mon_x, mon_y, mon_x + 42, mon_y + 35], fill=(22, 32, 28), outline=(60, 90, 80))
    draw.rectangle([mon_x + 4, mon_y + 4, mon_x + 38, mon_y + 31], fill=(6, 16, 10))
    # Code scanlines on CRT
    for ly in range(mon_y + 8, mon_y + 28, 4):
        draw.line([(mon_x + 8, ly), (mon_x + 28 + rng.randint(0, 6), ly)], fill=(0, 255, 128))

    # Metal grating platform & conduits in foreground
    draw.rectangle([0, int(H * 0.85), W, H], fill=(16, 26, 22))
    draw.line([(0, int(H * 0.85)), (W, int(H * 0.85))], fill=(0, 230, 118), width=2)
    for x in range(0, W, 12):
        draw.line([(x, int(H * 0.85)), (x, H)], fill=(28, 45, 38))

    save_scaled(img, 'systems_core_hero.png')

if __name__ == '__main__':
    print("Generating custom retro pixel art...")
    gen_python()
    gen_java()
    gen_dsa()
    gen_fullstack()
    gen_systems()
    print("All 5 custom pixel art backgrounds generated!")
