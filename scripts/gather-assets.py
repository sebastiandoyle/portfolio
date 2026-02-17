#!/usr/bin/env python3
"""
Gather app assets for portfolio:
1. Copy & resize app icons (1024 -> 256px)
2. Copy & resize raw/fastlane screenshots (-> 390x846)
3. Download Imposter screenshots from ASC API
4. Pull Imposter analytics from ASC API (best-effort)
"""

import os
import sys
import json
import time
import hashlib
import base64
import struct
import zlib
import shutil
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

HOME = Path.home()
PORTFOLIO = HOME / "Developer" / "portfolio"
PUBLIC_ICONS = PORTFOLIO / "public" / "apps" / "icons"
PUBLIC_SCREENSHOTS = PORTFOLIO / "public" / "apps" / "screenshots"
SCRIPTS_DIR = PORTFOLIO / "scripts"

# ASC API config
KEY_PATH = HOME / ".appstoreconnect" / "private_keys" / "AuthKey_374ZAKMU35.p8"
KEY_ID = "374ZAKMU35"
ISSUER_ID = "e65cca5c-1bf3-440b-9f0d-3989dec44b9e"
IMPOSTER_APP_ID = "6756529558"

# ---------- PNG resize helpers (no PIL dependency) ----------

def read_png_dimensions(path):
    """Read width and height from a PNG file's IHDR chunk."""
    with open(path, 'rb') as f:
        sig = f.read(8)
        if sig[:4] != b'\x89PNG':
            return None, None
        # IHDR chunk
        length = struct.unpack('>I', f.read(4))[0]
        chunk_type = f.read(4)
        data = f.read(length)
        if chunk_type == b'IHDR':
            w, h = struct.unpack('>II', data[:8])
            return w, h
    return None, None


def resize_with_sips(src, dst, width, height=None):
    """Use macOS sips to resize an image. Returns True on success."""
    src, dst = str(src), str(dst)
    if height:
        cmd = f'sips -z {height} {width} "{src}" --out "{dst}" 2>/dev/null'
    else:
        cmd = f'sips -Z {width} "{src}" --out "{dst}" 2>/dev/null'
    return os.system(cmd) == 0


# ---------- JWT for ASC API ----------

def base64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()


def generate_jwt():
    """Generate a JWT for ASC API using ES256."""
    try:
        import jwt as pyjwt
        with open(KEY_PATH) as f:
            key = f.read()
        now = int(time.time())
        payload = {
            "iss": ISSUER_ID,
            "iat": now,
            "exp": now + 1200,
            "aud": "appstoreconnect-v1",
        }
        token = pyjwt.encode(payload, key, algorithm="ES256", headers={"kid": KEY_ID})
        return token
    except ImportError:
        pass

    # Fallback: use authlib
    try:
        from authlib.jose import jwt as authlib_jwt
        with open(KEY_PATH) as f:
            key = f.read()
        now = int(time.time())
        header = {"alg": "ES256", "kid": KEY_ID, "typ": "JWT"}
        payload = {
            "iss": ISSUER_ID,
            "iat": now,
            "exp": now + 1200,
            "aud": "appstoreconnect-v1",
        }
        token = authlib_jwt.encode(header, payload, key)
        return token.decode() if isinstance(token, bytes) else token
    except ImportError:
        pass

    # Fallback: shell out to python with jwt
    print("  [WARN] No JWT library found, trying subprocess...")
    import subprocess
    script = f'''
import jwt, time
with open("{KEY_PATH}") as f:
    key = f.read()
now = int(time.time())
token = jwt.encode({{"iss": "{ISSUER_ID}", "iat": now, "exp": now + 1200, "aud": "appstoreconnect-v1"}}, key, algorithm="ES256", headers={{"kid": "{KEY_ID}"}})
print(token)
'''
    result = subprocess.run([sys.executable, "-c", script], capture_output=True, text=True)
    if result.returncode == 0:
        return result.stdout.strip()
    print(f"  [ERROR] JWT generation failed: {result.stderr}")
    return None


def asc_get(path, token):
    """Make a GET request to ASC API."""
    url = f"https://api.appstoreconnect.apple.com{path}"
    req = Request(url, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    })
    try:
        with urlopen(req) as resp:
            return json.loads(resp.read())
    except HTTPError as e:
        print(f"  [ERROR] {e.code} for {url}")
        try:
            print(f"  {e.read().decode()[:300]}")
        except:
            pass
        return None
    except URLError as e:
        print(f"  [ERROR] {e.reason} for {url}")
        return None


# ---------- Step 1c: Copy & resize app icons ----------

def gather_icons():
    print("\n=== Copying & resizing app icons (1024 -> 256px) ===")
    PUBLIC_ICONS.mkdir(parents=True, exist_ok=True)

    icon_sources = {
        "imposter": HOME / "Developer" / "Imposter" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "flipcoin": HOME / "Developer" / "FlipCoin" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "winddown": HOME / "Developer" / "WindDown" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "focusone": HOME / "Developer" / "FocusOne" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "diceroll": HOME / "Developer" / "DiceRoll" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "anchor": HOME / "Developer" / "Anchor" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "stillpoint": HOME / "Developer" / "Stillpoint" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "steadily": HOME / "Developer" / "Steadily" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "zendot": HOME / "Developer" / "ZenDot" / "Assets.xcassets" / "AppIcon.appiconset" / "icon_1024.png",
        "serenify": HOME / "Developer" / "Serenify" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "cleansnap": HOME / "Developer" / "CleanSnap" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "hydromind": HOME / "Developer" / "HydroMind" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "dusk": HOME / "Developer" / "Dusk" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "dawncalm": HOME / "Developer" / "DawnCalm" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "pocketbreath": HOME / "Developer" / "PocketBreath" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "grateful": HOME / "Developer" / "Grateful" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "breathly": HOME / "Developer" / "Breathly" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "teatimer": HOME / "Developer" / "TeaTimer" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
        "geoquizmaster": HOME / "Developer" / "GeoQuizMaster" / "Assets.xcassets" / "AppIcon.appiconset" / "icon.png",
    }

    count = 0
    for name, src in icon_sources.items():
        dst = PUBLIC_ICONS / f"{name}.png"
        if not src.exists():
            print(f"  [SKIP] {name}: source not found at {src}")
            continue
        if resize_with_sips(src, dst, 256):
            print(f"  [OK] {name}.png")
            count += 1
        else:
            # Fallback: just copy
            shutil.copy2(src, dst)
            print(f"  [COPY] {name}.png (resize failed, copied original)")
            count += 1

    print(f"\n  Total icons: {count}")
    return count


# ---------- Step 1d: Copy & resize screenshots ----------

def gather_screenshots():
    print("\n=== Copying & resizing app screenshots (-> 390x846) ===")

    screenshot_sources = {
        "flipcoin": [
            (HOME / "Developer" / "FlipCoin" / "screenshots_raw" / "heads.png", "1.png"),
            (HOME / "Developer" / "FlipCoin" / "screenshots_raw" / "history.png", "2.png"),
        ],
        "winddown": [
            (HOME / "Developer" / "WindDown" / "fastlane" / "screenshots" / "en-AU" / "1_6.5_inch.png", "1.png"),
            (HOME / "Developer" / "WindDown" / "fastlane" / "screenshots" / "en-AU" / "2_6.5_inch.png", "2.png"),
        ],
        "focusone": [
            (HOME / "Developer" / "FocusOne" / "screenshots" / "raw_screenshot_1.png", "1.png"),
        ],
        "cleansnap": [
            (HOME / "Developer" / "CleanSnap" / "fastlane" / "screenshots" / "en-US" / "APP_IPHONE_67_0_home.png", "1.png"),
        ],
    }

    count = 0
    for app_name, files in screenshot_sources.items():
        app_dir = PUBLIC_SCREENSHOTS / app_name
        app_dir.mkdir(parents=True, exist_ok=True)
        for src, dst_name in files:
            dst = app_dir / dst_name
            if not src.exists():
                print(f"  [SKIP] {app_name}/{dst_name}: source not found")
                continue
            if resize_with_sips(src, dst, 390, 846):
                print(f"  [OK] {app_name}/{dst_name}")
                count += 1
            else:
                shutil.copy2(src, dst)
                print(f"  [COPY] {app_name}/{dst_name}")
                count += 1

    print(f"\n  Total screenshots from local: {count}")
    return count


# ---------- Step 1b: Download Imposter screenshots from ASC API ----------

def download_imposter_screenshots(token):
    print("\n=== Downloading Imposter screenshots from ASC API ===")
    imposter_dir = PUBLIC_SCREENSHOTS / "imposter"
    imposter_dir.mkdir(parents=True, exist_ok=True)

    if not token:
        print("  [SKIP] No JWT token available")
        return 0

    # Get the READY_FOR_SALE version
    data = asc_get(
        f"/v1/apps/{IMPOSTER_APP_ID}/appStoreVersions?filter%5BappStoreState%5D=READY_FOR_SALE",
        token
    )
    if not data or not data.get("data"):
        # Try without filter
        data = asc_get(f"/v1/apps/{IMPOSTER_APP_ID}/appStoreVersions", token)

    if not data or not data.get("data"):
        print("  [ERROR] No app store versions found")
        return 0

    version = data["data"][0]
    version_id = version["id"]
    version_str = version.get("attributes", {}).get("versionString", "?")
    print(f"  Found version: {version_str} (id: {version_id})")

    # Get screenshot sets
    sets_data = asc_get(
        f"/v1/appStoreVersionLocalizations?filter%5BappStoreVersion%5D={version_id}",
        token
    )

    if not sets_data or not sets_data.get("data"):
        # Try via version relationship
        sets_data = asc_get(
            f"/v1/appStoreVersions/{version_id}/appStoreVersionLocalizations",
            token
        )

    if not sets_data or not sets_data.get("data"):
        print("  [ERROR] No localizations found")
        return 0

    loc_id = sets_data["data"][0]["id"]
    print(f"  Localization ID: {loc_id}")

    # Get screenshot sets for this localization
    ss_sets = asc_get(
        f"/v1/appStoreVersionLocalizations/{loc_id}/appScreenshotSets",
        token
    )

    if not ss_sets or not ss_sets.get("data"):
        print("  [ERROR] No screenshot sets found")
        return 0

    # Find iPhone 6.5" or 6.7" set
    target_set = None
    for s in ss_sets["data"]:
        display_type = s.get("attributes", {}).get("screenshotDisplayType", "")
        if "APP_IPHONE_67" in display_type or "APP_IPHONE_65" in display_type:
            target_set = s
            break

    if not target_set:
        # Use first available set
        target_set = ss_sets["data"][0]

    set_id = target_set["id"]
    display_type = target_set.get("attributes", {}).get("screenshotDisplayType", "unknown")
    print(f"  Using screenshot set: {display_type} (id: {set_id})")

    # Get screenshots
    screenshots = asc_get(
        f"/v1/appScreenshotSets/{set_id}/appScreenshots",
        token
    )

    if not screenshots or not screenshots.get("data"):
        print("  [ERROR] No screenshots in set")
        return 0

    count = 0
    for i, ss in enumerate(screenshots["data"][:5]):  # Max 5
        image_asset = ss.get("attributes", {}).get("imageAsset")
        if not image_asset:
            print(f"  [SKIP] Screenshot {i+1}: no imageAsset")
            continue

        template_url = image_asset.get("templateUrl", "")
        if not template_url:
            print(f"  [SKIP] Screenshot {i+1}: no templateUrl")
            continue

        # Replace template with actual dimensions
        # Use 1290x2796 for full res, then resize to 390x846
        url = template_url.replace("{w}", "1290").replace("{h}", "2796").replace("{f}", "png")
        print(f"  Downloading screenshot {i+1}...")

        try:
            req = Request(url)
            with urlopen(req) as resp:
                img_data = resp.read()

            tmp_path = imposter_dir / f"_tmp_{i+1}.png"
            final_path = imposter_dir / f"{i+1}.png"

            with open(tmp_path, 'wb') as f:
                f.write(img_data)

            # Resize to 390x846
            if resize_with_sips(tmp_path, final_path, 390, 846):
                tmp_path.unlink()
                print(f"  [OK] imposter/{i+1}.png")
                count += 1
            else:
                tmp_path.rename(final_path)
                print(f"  [OK] imposter/{i+1}.png (unresized)")
                count += 1

        except Exception as e:
            print(f"  [ERROR] Screenshot {i+1}: {e}")

    print(f"\n  Total Imposter screenshots: {count}")
    return count


# ---------- Step 1a: Pull Imposter analytics ----------

def pull_imposter_analytics(token):
    print("\n=== Pulling Imposter analytics from ASC API ===")
    asc_data = {"app_id": IMPOSTER_APP_ID, "analytics": {}, "app_info": {}}

    if not token:
        print("  [SKIP] No JWT token available")
        save_asc_data(asc_data)
        return

    # Get app info
    app_data = asc_get(f"/v1/apps/{IMPOSTER_APP_ID}", token)
    if app_data and app_data.get("data"):
        attrs = app_data["data"].get("attributes", {})
        asc_data["app_info"] = {
            "name": attrs.get("name", "Imposter"),
            "bundleId": attrs.get("bundleId", ""),
            "sku": attrs.get("sku", ""),
        }
        print(f"  App: {asc_data['app_info']['name']}")

    # Try perfPowerMetrics (might not be available for small apps)
    perf = asc_get(f"/v1/apps/{IMPOSTER_APP_ID}/perfPowerMetrics", token)
    if perf and perf.get("data"):
        asc_data["analytics"]["performance"] = "available"
        print("  Performance metrics available")
    else:
        asc_data["analytics"]["performance"] = "not_available"
        print("  Performance metrics not available (normal for newer apps)")

    save_asc_data(asc_data)


def save_asc_data(data):
    out_path = SCRIPTS_DIR / "asc-data.json"
    with open(out_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"\n  Saved ASC data to {out_path}")


# ---------- Main ----------

def main():
    print("=" * 60)
    print("Portfolio Asset Gatherer")
    print("=" * 60)

    # Generate JWT
    print("\nGenerating JWT for ASC API...")
    token = generate_jwt()
    if token:
        print("  [OK] JWT generated")
    else:
        print("  [WARN] JWT generation failed, will skip ASC API calls")

    # Step 1c: Icons
    icon_count = gather_icons()

    # Step 1d: Local screenshots
    screenshot_count = gather_screenshots()

    # Step 1b: Imposter screenshots from ASC
    imposter_count = download_imposter_screenshots(token)

    # Step 1a: Analytics
    pull_imposter_analytics(token)

    print("\n" + "=" * 60)
    print(f"Done! Icons: {icon_count}, Screenshots: {screenshot_count + imposter_count}")
    print("=" * 60)


if __name__ == "__main__":
    main()
