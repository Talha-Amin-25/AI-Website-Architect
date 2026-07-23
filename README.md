# AI Website Architect - Interactive Design Intelligence Workspace

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2-red.svg)](https://docs.pydantic.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

An industry-ready, production-grade AI-powered **Website Architect** system. Acting as an automated Senior UX Strategist and Information Architect, this engine analyzes business profiles, copy assets, and image quality metadata to construct structured, high-converting UX Website Blueprints.

The system features a **FastAPI backend** implementing a custom Design Intelligence Rules Engine alongside a **responsive glassmorphic UI workspace** for real-time validation and interactive wireframe generation.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.8+, FastAPI, Uvicorn, Pydantic v2
- **Frontend**: HTML5, Vanilla CSS3 (Custom Glassmorphism Design System), JavaScript (ES6+)
- **Architecture**: Design Intelligence Rules Engine, WCAG 2.1 Luminance Algorithms, Gestalt Layout Mapping

---

## 🌟 Key Capabilities & Features

- **Multi-Attribute Hero Selector**: Selects the optimal primary hero visual using a composite scoring formula:
  $$\text{Score} = (0.35 \times \text{Lighting}) + (0.35 \times \text{Composition}) + (0.20 \times \text{Luxury}) + (0.10 \times \text{Contrast})$$
- **WCAG 2.1 Contrast Math Engine**: Calculates human-perceived relative luminance of imagery and hex palettes to guarantee WCAG AA/AAA compliance.
- **Explainable AI (XAI)**: Generates human-readable context rationales and confidence scores for every layout node and UX suggestion.
- **Dynamic Wireframe & Canvas View**: Interactively renders layout node flows, structural skeletons, font pairings, and color palettes.
- **RESTful API Architecture**: Exposes endpoints for blueprint generation, asset library querying, intelligence rules, and design analytics.

---

## 📐 System Architecture

```
[ Client Questionnaire / Asset Intelligence Inputs ]
                       │
                       ▼
┌──────────────────────────────────────────────┐
│          Pydantic Validation Layer           │
│         (Type-safe Schema Enforcer)          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│        WebsiteArchitectEngine (Logic)        │
│  ├── Multi-Attribute Asset Quality Scoring   │
│  ├── Dynamic Archetype & Typography Resolver │
│  ├── WCAG 2.1 Contrast & Accessibility Math  │
│  └── Gestalt Flow Layout & Sequencer         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│      Structured JSON Blueprint Output        │
│  (UX Recommendations & Design Analytics)     │
└──────────────────────────────────────────────┘
```

---

## 📂 Folder Structure

```
.
├── engine/
│   ├── __init__.py
│   ├── architect.py       # Core rules engine, contrast math & algorithms
│   ├── models.py          # Pydantic data schemas & validation models
│   └── templates.py       # Layout archetypes, typography & SEO specifications
├── static/
│   ├── css/
│   │   └── style.css      # Dark glassmorphic styling & UI theme system
│   ├── js/
│   │   └── dashboard.js   # Frontend controller & canvas graph rendering
│   └── index.html         # Interactive dashboard user interface
├── Image/                 # Reference visual assets & diagrams
├── app.py                 # FastAPI server entry point & RESTful API routes
├── generate_docx.py       # Technical documentation generator script
├── test_endpoints.py      # Automated API verification test suite
├── requirements.txt       # Project Python dependencies
├── .gitignore             # Git exclusion rules
└── README.md              # Project documentation
```

---

## 🚀 Quick Start Instructions

Follow these steps to set up and launch the dashboard locally:

### 1. Clone & Navigate to Repository
```bash
git clone https://github.com/Talha-Amin-25/AI-Website-Architect.git
cd AI-Website-Architect
```

### 2. Install Dependencies
Ensure Python 3.8+ is installed, then install the required packages:
```bash
pip install -r requirements.txt
```
*(On Windows systems, you can also run `py -m pip install -r requirements.txt`)*

### 3. Start the Server
Launch the application using Python:
```bash
python app.py
```
*(Alternatively on Windows: `py app.py`)*

### 4. Access the Interface
Open your web browser and navigate to:
```
http://localhost:8000
```

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Serves the interactive workspace dashboard |
| `POST` | `/api/v1/generate-blueprint` | Processes client questionnaire & outputs structured blueprint |
| `GET` | `/api/v1/blueprints` | Lists all active saved site blueprints |
| `GET` | `/api/v1/blueprints/{id}` | Retrieves detailed specification for a single blueprint |
| `DELETE`| `/api/v1/blueprints/{id}` | Deletes a stored blueprint |
| `GET` | `/api/v1/assets` | Returns asset library with quality feature scores |
| `GET` | `/api/v1/intelligence/rules` | Retrieves active UX decision rules & math models |
| `GET` | `/api/v1/analytics` | Returns engine execution metrics & score distributions |
| `GET` | `/api/v1/settings` | Fetches current engine parameters |
| `POST` | `/api/v1/settings` | Updates engine parameters dynamically |
| `GET` | `/api/v1/health` | Service health status check |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
