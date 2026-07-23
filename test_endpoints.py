import urllib.request
import json

base_url = 'http://localhost:8000'

def test(path, method='GET', data=None):
    req = urllib.request.Request(f'{base_url}{path}', method=method)
    if data:
        req.add_header('Content-Type', 'application/json')
        body = json.dumps(data).encode('utf-8')
    else:
        body = None
    try:
        with urllib.request.urlopen(req, data=body) as resp:
            status = resp.status
            res = json.loads(resp.read().decode('utf-8'))
            print(f"[SUCCESS] [{method} {path}] -> STATUS {status}")
            if isinstance(res, dict):
                print(f"   Response Keys: {list(res.keys())}")
            elif isinstance(res, list):
                print(f"   Item Count: {len(res)}")
            return True
    except Exception as e:
        print(f"[FAIL] [{method} {path}] -> ERROR: {e}")
        return False

print("=== VERIFYING API ENDPOINTS & SYSTEM FUNCTIONALITY ===")
test('/api/v1/health')
test('/api/v1/blueprints')
test('/api/v1/assets')
test('/api/v1/intelligence/rules')
test('/api/v1/analytics')
test('/api/v1/settings')

sample_payload = {
    "business_name": "Apex Enterprise",
    "business_category": "Technology",
    "target_audience": "CTOs & Tech Leaders",
    "location": "San Francisco",
    "brand_colors_hex": ["#0F172A", "#38BDF8"],
    "services": ["Cloud Migration", "AI Engine"],
    "packages": [{"name": "Enterprise", "price": "$999"}],
    "images": [{
        "id": "img_01",
        "url": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        "lighting_score": 0.9,
        "composition_score": 0.95,
        "contrast_ratio": 8.0,
        "is_dark_background": True,
        "luxury_feel_score": 0.85,
        "subject_alignment": "center"
    }]
}

test('/api/v1/generate-blueprint', method='POST', data=sample_payload)
test('/api/v1/settings', method='POST', data={'strict_wcag_aaa': True, 'hero_weight_lighting': 0.4, 'auto_save_enabled': True})
