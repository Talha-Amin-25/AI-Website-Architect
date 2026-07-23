# Design Presets and Style Guides for Archetypes

TYPOGRAPHY_TEMPLATES = {
    "Luxury": {
        "heading_font": "Playfair Display",
        "body_font": "Plus Jakarta Sans",
        "font_type": "Mixed (Serif Heading + Sans Body)",
        "rationale": "High-contrast pairing. The elegant high-contrast letterforms of Playfair Display convey high-end craft and prestige, while Plus Jakarta Sans maintains clean, spacious, modern legibility in copy.",
        "details": {
            "h1_size": "56px / 1.15",
            "h1_weight": "600 (Semi-Bold)",
            "body_size": "16px / 1.7",
            "body_weight": "400 (Regular)",
            "letter_spacing": "0.02em"
        }
    },
    "Elegant": {
        "heading_font": "Cormorant Garamond",
        "body_font": "Montserrat",
        "font_type": "Mixed (Elegant Serif + Balanced Sans)",
        "rationale": "Cormorant Garamond brings traditional calligraphic aesthetics suited for luxury lifestyle brands, balanced with Montserrat's geometric clarity for digital readability.",
        "details": {
            "h1_size": "52px / 1.2",
            "h1_weight": "500 (Medium)",
            "body_size": "15px / 1.6",
            "body_weight": "300 (Light)",
            "letter_spacing": "0.04em"
        }
    },
    "Modern": {
        "heading_font": "Outfit",
        "body_font": "Inter",
        "font_type": "Sans (Geometric Heading + Clean Neo-Grotesque Body)",
        "rationale": "Clean, tech-forward, and highly structured appearance. Outfit delivers unique geometric roundness to headlines while Inter offers industry-standard legibility at any viewport size.",
        "details": {
            "h1_size": "64px / 1.1",
            "h1_weight": "700 (Bold)",
            "body_size": "16px / 1.6",
            "body_weight": "400 (Regular)",
            "letter_spacing": "-0.01em"
        }
    },
    "Corporate": {
        "heading_font": "Roboto Slab",
        "body_font": "Roboto",
        "font_type": "Mixed (Slab Serif Heading + Neo-Grotesque Sans Body)",
        "rationale": "Slab serifs communicate solid structural integrity, trustworthiness, and establishment, while the accompanying sans-serif ensures maximum accessibility across business audiences.",
        "details": {
            "h1_size": "48px / 1.25",
            "h1_weight": "700 (Bold)",
            "body_size": "16px / 1.5",
            "body_weight": "400 (Regular)",
            "letter_spacing": "0em"
        }
    },
    "Traditional": {
        "heading_font": "Lora",
        "body_font": "Open Sans",
        "font_type": "Mixed (Serif Heading + Friendly Sans Body)",
        "rationale": "Lora evokes classic editorial craftsmanship, perfect for established services, legal, or traditional medical businesses. Open Sans offsets this with friendly, warm, highly legible text blocks.",
        "details": {
            "h1_size": "44px / 1.3",
            "h1_weight": "600 (Semi-Bold)",
            "body_size": "16px / 1.6",
            "body_weight": "400 (Regular)",
            "letter_spacing": "0.01em"
        }
    }
}

LAYOUT_TEMPLATES = {
    "Hero": {
        "Luxury": "Split Full-Bleed Hero with Left-Aligned Overlay",
        "Elegant": "Asymmetric Minimalist Banner with Floating Image Card",
        "Modern": "Centred Minimalist Hero with Glassmorphic Card Overlay",
        "Corporate": "Structured Hero Grid with Right-Aligned Product Demonstration",
        "Traditional": "Full-Width Focal Image Banner with Left Text Card Container"
    },
    "About": {
        "Luxury": "2-Column Asymmetric Grid (Text Left, Brand Image Right with Deep Margins)",
        "Elegant": "Overlay Block (Image Container with Offset Floating Text Box)",
        "Modern": "Feature Grid Split (1/3 Heading and Metric Badges, 2/3 Narrative Text + Highlight Image)",
        "Corporate": "Symmetrical 2-Column Grid with Embedded Trust Indicators",
        "Traditional": "Classic Editorial Columns with Left-Aligned Border and Centred Profile Picture"
    },
    "Packages": {
        "Luxury": "Tiered Membership Cards with Custom Accent Gold Highlights",
        "Elegant": "Tabbed Selection Cards with Smooth Fade Transitions",
        "Modern": "3-Column Pricing Cards with Center Highlight & Glassmorphism Hover Effects",
        "Corporate": "Side-by-Side Comparison Matrix with Tick List and Contact Primary CTA",
        "Traditional": "Simple Vertical Accordion List with Plain Detail Summaries"
    },
    "Gallery": {
        "Luxury": "Masonry Dynamic Grid (Large Showcase Frames with Fine Gaps)",
        "Elegant": "Alternating Horizontal Row Slider with Soft Rounded Edges",
        "Modern": "CSS Grid Collage with Mouse-Interactive Transform & Zoom Animations",
        "Corporate": "Clean 4-Column Image Cards with Bottom Context Captions",
        "Traditional": "Standard Square Thumbnail Carousel with Left/Right Arrows"
    },
    "Contact": {
        "Luxury": "Inline Split Layout: Elegant Address/Map on Left, High-Contrast Minimalist Form on Right",
        "Elegant": "Centred Compact Contact Form with Soft Subtle Border Gradients",
        "Modern": "Interactive Multi-Step Form Card with Neon Border Accents & Real-Time Feedback",
        "Corporate": "Standard 2-Column Split: Detailed Inquiry Input Form + Map Embed",
        "Traditional": "Simple Card Form Container with Top Icon and Phone Call CTA Card"
    }
}

SEO_PRIORITY_RULES = [
    "H1 Single Tag Constraint: Ensure only one <h1> tag exists, located in the Hero Section.",
    "Dynamic Image Alt Text generation using image intelligence tags to improve visual search indexing.",
    "Semantic HTML5 Mapping: Enforce header, main, section (with aria-labels), footer tags for crawler traversal.",
    "Local SEO Structured Data Schema: Embed JSON-LD schema with coordinates, rating scores, and service descriptors.",
    "Breadcrumb Navigation Schema: Included to enhance deep site mapping."
]

MOBILE_UX_HEURISTICS = [
    "Target Touch Padding: All interactive inputs and CTA buttons must maintain a touch target size of >= 48px.",
    "Adaptive Responsive Breakpoints: Auto-collapse multi-column structures to single column below 768px viewports.",
    "Sticky Bottom CTA Action Strip: Anchor a primary conversion button at the viewport bottom on viewports below 480px.",
    "Interactive Gesture Optimization: Ensure carousel/gallery items support touch swipe motions.",
    "Prevent Zoom Errors: Set responsive forms to viewport scale 1.0 on focus by setting input font-sizes to >= 16px."
]
