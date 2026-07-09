#!/usr/bin/env python3
"""Lee .env del proyecto y exporta las variables para Ansible."""
import os
import sys
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent.parent / '.env'

if not env_path.exists():
    print("[WARN] .env no encontrado", file=sys.stderr)
    sys.exit(1)

with open(env_path) as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if '=' not in line:
            continue
        key, _, val = line.partition('=')
        key = key.strip()
        val = val.strip().strip('"\'').strip()
        if key and val:
            os.environ[key] = val

print("[OK] Variables cargadas desde .env")
