// ==========================================================================
// AI WEBSITE ARCHITECT - WORKSPACE CONTROLLER (v2.5 FIXED & FULLY FUNCTIONAL)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Application State
    let currentBlueprint = null;
    let storedBlueprints = [];
    let assetLibrary = [];

    // Default Sample Blueprint
    const defaultBlueprint = {
        "id": "bp_default_aura",
        "business_name": "Aura Luxury Stay",
        "archetype": "Luxury",
        "typography": {
            "heading_font": "Playfair Display",
            "body_font": "Plus Jakarta Sans",
            "font_type": "Serif Heading + Clean Sans Body",
            "rationale": "Conveys timeless prestige, sophistication, and high visual legibility across executive screens.",
            "details": {
                "h1_size": "56px / 1.15",
                "h1_weight": "700 (Bold)",
                "body_size": "16px / 1.6",
                "body_weight": "400 (Regular)"
            }
        },
        "color_palette": {
            "primary": "#1A2B4C",
            "secondary": "#C5A059",
            "accent_cta": "#D4AF37",
            "neutral_bg": "#0B0F19",
            "text_color": "#FFFFFF",
            "wcag_compliance": "WCAG 2.1 AAA Passed (12.4:1)",
            "contrast_ratios": {
                "primary_to_bg": 12.4,
                "accent_cta_to_bg": 9.1
            }
        },
        "hero_section": {
            "section_id": "sec_hero",
            "section_type": "Hero Section",
            "recommended_layout": "Split Full-Bleed Layout with Left-Aligned Title Overlay",
            "order_priority": 1,
            "assigned_images": ["img_villa_01"],
            "cta_placement": "Bottom-Left Hero CTA (Gold Gradient)",
            "heading_position": "Top-Left Overlay",
            "confidence_score": 0.98,
            "rationale": "Calculated highest weighted quality score (0.98 luxury, 0.95 lighting) for 'img_villa_01'. Left-aligned CTA minimizes Fitts's law targeting delay."
        },
        "sections_architecture": [
            {
                "section_id": "sec_about",
                "section_type": "About Narrative",
                "recommended_layout": "2-Column Asymmetric Grid with Highlight Image Frame",
                "order_priority": 2,
                "assigned_images": ["img_dining_02"],
                "confidence_score": 0.92,
                "rationale": "Establishes trust and heritage narrative immediately following visual interest capture in the Hero banner."
            },
            {
                "section_id": "sec_packages",
                "section_type": "Service Packages",
                "recommended_layout": "3-Column Tiered Pricing Grid with Center Card Highlight",
                "order_priority": 3,
                "assigned_images": [],
                "cta_placement": "Card Bottom Accent Button",
                "confidence_score": 0.95,
                "rationale": "Applies Gestalt grouping principles to cluster pricing tiers and facilitate price-to-value decision making."
            },
            {
                "section_id": "sec_gallery",
                "section_type": "Work Gallery",
                "recommended_layout": "Masonry Dynamic Grid with Hover Elevation",
                "order_priority": 4,
                "assigned_images": ["img_villa_01", "img_dining_02"],
                "confidence_score": 0.89,
                "rationale": "Provides visual social proof through curated high-resolution gallery collages."
            },
            {
                "section_id": "sec_contact",
                "section_type": "Contact Layout",
                "recommended_layout": "Split Form with Direct Reservation Calendar",
                "order_priority": 5,
                "assigned_images": [],
                "cta_placement": "Submit Action Button",
                "confidence_score": 0.96,
                "rationale": "Reduces friction by combining reservation parameter inputs directly beside key conversion guarantees."
            }
        ],
        "seo_priority": [
            "H1 Single Tag Constraint: Ensure only one <h1> tag exists in the Hero Section.",
            "Dynamic Image Alt Text generation using image intelligence tags to improve visual search indexing.",
            "Semantic HTML5 Mapping: Enforce header, main, section, footer tags for crawler traversal.",
            "Local SEO Structured Data Schema: Embed JSON-LD schema with coordinates and service descriptors."
        ],
        "mobile_ux_heuristics": [
            "Target Touch Padding: All interactive inputs and CTA buttons must maintain a touch target size >= 48px.",
            "Adaptive Responsive Breakpoints: Auto-collapse multi-column structures to single column below 768px viewports.",
            "Sticky Bottom CTA Action Strip: Anchor a primary conversion button at the viewport bottom on viewports below 480px."
        ],
        "design_scores": {
            "conversion": 94,
            "ux": 92,
            "performance": 96,
            "seo": 89
        }
    };

    // ==========================================
    // MULTI-PAGE NAVIGATION SWITCHER
    // ==========================================
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    const pageViews = document.querySelectorAll(".page-view");
    const breadcrumbCurrent = document.getElementById("breadcrumb-current-view");

    function switchView(viewId) {
        pageViews.forEach(pv => pv.classList.remove("active"));
        navItems.forEach(ni => ni.classList.remove("active"));

        const targetView = document.getElementById(`view-${viewId}`);
        const targetNav = document.querySelector(`.sidebar-nav .nav-item[data-view="${viewId}"]`);

        if (targetView) targetView.classList.add("active");
        if (targetNav) targetNav.classList.add("active");

        if (breadcrumbCurrent) {
            const viewTitle = viewId.replace("-", " ").toUpperCase();
            breadcrumbCurrent.innerText = viewTitle.charAt(0) + viewTitle.slice(1).toLowerCase();
        }

        // Trigger view-specific data loading
        if (viewId === "blueprints") fetchAndRenderBlueprints();
        if (viewId === "assets") fetchAndRenderAssets();
        if (viewId === "preview") renderLiveSitePreview();
        if (viewId === "analytics") fetchAndRenderAnalytics();
        if (viewId === "settings") fetchAndRenderSettings();
        if (viewId === "dashboard") setTimeout(drawCanvasLines, 50);
    }

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            switchView(view);
        });
    });

    // ==========================================
    // HEADER ACTIONS & DROPDOWNS
    // ==========================================
    const notifBtn = document.getElementById("notif-toggle-btn");
    const notifDropdown = document.getElementById("notif-dropdown");
    const clearNotifs = document.getElementById("clear-notifs");
    const notifBadge = document.querySelector(".notif-badge");

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
                notifDropdown.classList.remove("active");
            }
        });
    }

    if (clearNotifs) {
        clearNotifs.addEventListener("click", () => {
            const list = document.getElementById("notif-list");
            if (list) list.innerHTML = `<div class="notif-item"><span class="notif-title text-muted">No new notifications</span></div>`;
            if (notifBadge) notifBadge.style.display = "none";
            showToast("Notifications cleared");
        });
    }

    // Help Modal Handler
    const helpBtn = document.getElementById("help-toggle-btn");
    const helpModal = document.getElementById("help-modal");
    const closeHelp = document.getElementById("close-help-btn");

    if (helpBtn && helpModal) {
        helpBtn.addEventListener("click", () => helpModal.classList.add("active"));
    }
    if (closeHelp && helpModal) {
        closeHelp.addEventListener("click", () => helpModal.classList.remove("active"));
    }
    if (helpModal) {
        helpModal.addEventListener("click", (e) => {
            if (e.target === helpModal) helpModal.classList.remove("active");
        });
    }

    // User Profile Modal Handler
    const profileBtn = document.getElementById("user-profile-btn");
    const profileModal = document.getElementById("profile-modal");
    const closeProfile = document.getElementById("close-profile-btn");
    const profileForm = document.getElementById("profile-settings-form");
    const copyApiKeyBtn = document.getElementById("copy-api-key-btn");
    const logoutBtn = document.getElementById("logout-profile-btn");

    if (profileBtn && profileModal) {
        profileBtn.addEventListener("click", () => profileModal.classList.add("active"));
    }
    if (closeProfile && profileModal) {
        closeProfile.addEventListener("click", () => profileModal.classList.remove("active"));
    }
    if (profileModal) {
        profileModal.addEventListener("click", (e) => {
            if (e.target === profileModal) profileModal.classList.remove("active");
        });
    }

    if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newName = document.getElementById("edit-profile-name").value;
            const newRole = document.getElementById("edit-profile-role").value;
            const newAvatar = document.getElementById("edit-profile-avatar").value;

            // Update UI widgets
            const nameEl = document.getElementById("profile-widget-name");
            const roleEl = document.getElementById("profile-widget-role");
            const avatarEl = document.getElementById("profile-widget-avatar");
            const modalNameEl = document.getElementById("modal-profile-name");
            const modalAvatarEl = document.getElementById("modal-avatar-preview");

            if (nameEl) nameEl.innerText = newName;
            if (roleEl) roleEl.innerHTML = `${newRole} <span class="premium-badge">PRO</span>`;
            if (avatarEl && newAvatar) avatarEl.src = newAvatar;
            if (modalNameEl) modalNameEl.innerText = newName;
            if (modalAvatarEl && newAvatar) modalAvatarEl.src = newAvatar;

            profileModal.classList.remove("active");
            showToast("Profile information successfully updated!");
        });
    }

    if (copyApiKeyBtn) {
        copyApiKeyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("demo_api_key_8e1234567890abcdef");
            showToast("API Key copied to clipboard!");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            showToast("Session logged out (Demo mode)");
            if (profileModal) profileModal.classList.remove("active");
        });
    }

    // Project Status Card Close Toggle
    const closeStatusBtn = document.getElementById("close-status-btn");
    const statusWidget = document.getElementById("project-status-widget");
    if (closeStatusBtn && statusWidget) {
        closeStatusBtn.addEventListener("click", () => {
            statusWidget.style.display = statusWidget.style.display === "none" ? "block" : "none";
        });
    }

    // Sidebar Spec Panels Collapse Toggle
    document.querySelectorAll(".spec-section-header").forEach(hdr => {
        hdr.addEventListener("click", () => {
            const sec = hdr.closest(".spec-section");
            if (sec) sec.classList.toggle("collapsed");
        });
    });

    // Theme Toggle Handler
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const body = document.body;
            const icon = themeToggle.querySelector("i");
            if (body.classList.contains("dark-theme")) {
                body.classList.remove("dark-theme");
                body.classList.add("light-theme");
                icon.className = "fa-regular fa-sun";
                showToast("Theme switched to Light Mode");
            } else {
                body.classList.remove("light-theme");
                body.classList.add("dark-theme");
                icon.className = "fa-regular fa-moon";
                showToast("Theme switched to Dark Mode");
            }
            setTimeout(drawCanvasLines, 100);
        });
    }

    // Viewport switcher buttons (Dashboard banner & Preview header)
    function setupViewportButtons(selector, frameId) {
        const btns = document.querySelectorAll(selector);
        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                btns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const vp = btn.dataset.viewport || btn.dataset.previewVp;
                const frame = document.getElementById(frameId);
                if (frame) {
                    if (vp === "desktop") frame.style.maxWidth = "1000px";
                    else if (vp === "tablet") frame.style.maxWidth = "640px";
                    else frame.style.maxWidth = "375px";
                }
            });
        });
    }

    setupViewportButtons(".preview-viewport-selector .viewport-btn", "site-preview-frame");
    setupViewportButtons(".banner-controls .viewport-btn", "wireframe-viewport");

    // ==========================================
    // INITIALIZATION & DEFAULT STATE
    // ==========================================
    loadBlueprint(defaultBlueprint);

    // Standalone Full Page Questionnaire Submit
    const pgForm = document.getElementById("standalone-questionnaire-form");
    if (pgForm) {
        pgForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = pgForm.querySelector('button[type="submit"]');
            const origText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-arrows-spin fa-spin"></i> Executing Engine...`;

            try {
                const colorsInput = document.getElementById("pg_brand_colors").value;
                const colorsArray = colorsInput.split(",").map(c => c.trim());
                const servicesInput = document.getElementById("pg_services").value;
                const servicesArray = servicesInput.split(",").map(s => s.trim());

                const packages = [];
                const pkgNames = document.querySelectorAll(".pg-pkg-name");
                const pkgPrices = document.querySelectorAll(".pg-pkg-price");
                for (let i = 0; i < pkgNames.length; i++) {
                    if (pkgNames[i].value && pkgPrices[i].value) {
                        packages.push({"name": pkgNames[i].value, "price": pkgPrices[i].value});
                    }
                }

                const images = [{
                    "id": document.querySelector(".pg-ast-id").value,
                    "url": document.querySelector(".pg-ast-url").value,
                    "lighting_score": parseFloat(document.querySelector(".pg-ast-light").value),
                    "composition_score": parseFloat(document.querySelector(".pg-ast-comp").value),
                    "contrast_ratio": 7.5,
                    "is_dark_background": true,
                    "luxury_feel_score": parseFloat(document.querySelector(".pg-ast-luxury").value),
                    "subject_alignment": "left"
                }];

                const payload = {
                    "business_name": document.getElementById("pg_biz_name").value,
                    "business_category": document.getElementById("pg_biz_cat").value,
                    "target_audience": document.getElementById("pg_biz_audience").value,
                    "location": document.getElementById("pg_biz_loc").value,
                    "brand_colors_hex": colorsArray,
                    "services": servicesArray,
                    "packages": packages,
                    "images": images,
                    "meeting_notes": document.getElementById("pg_notes").value
                };

                const res = await fetch("/api/v1/generate-blueprint", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error("Backend engine failed to process blueprint.");
                const result = await res.json();
                loadBlueprint(result);
                switchView("dashboard");
                showToast(`Generated Blueprint for ${result.business_name}`);

                // Add to notification dropdown
                addNotification(`Blueprint Generated: ${result.business_name}`, `Conversion Score: ${result.design_scores.conversion}/100`);

            } catch (err) {
                console.error("API Error:", err);
                alert("Engine Execution Error: " + err.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origText;
            }
        });
    }

    // Questionnaire Preset Templates Handler
    const presets = {
        "luxury": {
            name: "Aura Luxury Villa",
            cat: "Luxury Hospitality",
            aud: "High-Net-Worth Travelers",
            loc: "Maldives",
            colors: "#1A2B4C, #C5A059, #D4AF37",
            services: "Boutique Villas, Private Sunset Dining, Spa Treatments",
            pkgs: [
                {name: "Royal Pavilion", price: "$1800/night"},
                {name: "Overwater Suite", price: "$1200/night"}
            ]
        },
        "saas": {
            name: "Apex SaaS Platform",
            cat: "Technology & SaaS",
            aud: "Enterprise Tech Leaders",
            loc: "San Francisco, USA",
            colors: "#0F172A, #6366F1, #38BDF8",
            services: "AI Analytics, Automated Workflows, Cloud Monitoring",
            pkgs: [
                {name: "Pro Tier", price: "$99/mo"},
                {name: "Enterprise Plan", price: "$499/mo"}
            ]
        },
        "legal": {
            name: "Nexus Law Group",
            cat: "Corporate Legal Services",
            aud: "Institutional Investors",
            loc: "London, UK",
            colors: "#0B132B, #1C2541, #C5A059",
            services: "Mergers & Acquisitions, Patent Litigation, Regulatory Advisory",
            pkgs: [
                {name: "Corporate Audit", price: "$4500"},
                {name: "Retainer Advisory", price: "$8500/mo"}
            ]
        },
        "medical": {
            name: "Smile Dental Clinic",
            cat: "Healthcare & Aesthetics",
            aud: "Families and Local Residents",
            loc: "Chicago, USA",
            colors: "#0284C7, #38BDF8, #F8FAFC",
            services: "Cosmetic Dentistry, Orthodontics, Oral Surgery",
            pkgs: [
                {name: "Hygiene Check", price: "$150"},
                {name: "Full Smile Design", price: "$2200"}
            ]
        }
    };

    Object.keys(presets).forEach(key => {
        const btn = document.getElementById(`preset-${key}`);
        if (btn) {
            btn.addEventListener("click", () => {
                const data = presets[key];
                document.getElementById("pg_biz_name").value = data.name;
                document.getElementById("pg_biz_cat").value = data.cat;
                document.getElementById("pg_biz_audience").value = data.aud;
                document.getElementById("pg_biz_loc").value = data.loc;
                document.getElementById("pg_brand_colors").value = data.colors;
                document.getElementById("pg_services").value = data.services;
                
                const container = document.getElementById("pg-packages-list");
                container.innerHTML = "";
                data.pkgs.forEach(p => {
                    const row = document.createElement("div");
                    row.className = "package-input-row";
                    row.innerHTML = `
                        <input type="text" class="pg-pkg-name" value="${p.name}" required>
                        <input type="text" class="pg-pkg-price" value="${p.price}" required>
                    `;
                    container.appendChild(row);
                });
                showToast(`Loaded ${data.name} preset template!`);
            });
        }
    });

    // Inner Tabs Logic on Dashboard
    const tabBtns = document.querySelectorAll(".workspace-tabs .tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            const contentId = btn.dataset.content;
            document.getElementById(contentId).classList.add("active");
            if (contentId === "canvas-view") setTimeout(drawCanvasLines, 50);
        });
    });

    window.addEventListener("resize", drawCanvasLines);

    // ==========================================
    // CORE UI RENDERING FUNCTIONS
    // ==========================================
    function loadBlueprint(blueprint) {
        currentBlueprint = blueprint;
        
        document.getElementById("project-business-name").innerText = blueprint.business_name;
        document.getElementById("breadcrumb-category").innerText = blueprint.business_name;
        document.getElementById("project-archetype-desc").innerText = `${blueprint.archetype} Visual Archetype & UX Blueprint`;

        document.getElementById("json-code-block").innerText = JSON.stringify(blueprint, null, 2);

        // Bottom Metrics
        animateMetricValue("metric-conversion", blueprint.design_scores.conversion || 94);
        animateMetricValue("metric-ux", blueprint.design_scores.ux || 91);
        animateMetricValue("metric-performance", blueprint.design_scores.performance || 96);
        animateMetricValue("metric-seo", blueprint.design_scores.seo || 89);

        document.getElementById("bar-conversion").style.width = `${blueprint.design_scores.conversion || 94}%`;
        document.getElementById("bar-ux").style.width = `${blueprint.design_scores.ux || 91}%`;
        document.getElementById("bar-performance").style.width = `${blueprint.design_scores.performance || 96}%`;
        document.getElementById("bar-seo").style.width = `${blueprint.design_scores.seo || 89}%`;

        // Progress indicators
        const overall = Math.round(((blueprint.design_scores.ux || 91) * 0.4) + ((blueprint.design_scores.conversion || 94) * 0.3) + ((blueprint.design_scores.performance || 96) * 0.3));
        document.getElementById("overall-asset-score-val").innerText = overall;
        document.getElementById("project-progress-val").innerText = `${overall}%`;

        const mainCircle = document.getElementById("project-progress-bar");
        if (mainCircle) mainCircle.style.strokeDashoffset = 201 - (overall / 100) * 201;

        // Typography panel
        document.getElementById("font-heading-name").innerText = blueprint.typography.heading_font;
        document.getElementById("font-body-name").innerText = `${blueprint.typography.body_font} (Body)`;
        document.getElementById("font-lead-letter").innerText = blueprint.typography.heading_font.substring(0, 2);
        document.getElementById("font-lead-letter").style.fontFamily = `'${blueprint.typography.heading_font}', serif`;

        document.getElementById("font-h1-spec").innerText = `H1: ${blueprint.typography.details.h1_size || '56px'}`;
        document.getElementById("font-h2-spec").innerText = `H2: 36px (${blueprint.typography.details.h1_weight || '700'})`;
        document.getElementById("font-body-spec").innerText = `Body: ${blueprint.typography.details.body_size || '16px'}`;

        renderColorSystem(blueprint.color_palette);
        renderCanvasNodes(blueprint);
        renderWireframe(blueprint);
        renderChecklists(blueprint);
    }

    function animateMetricValue(id, targetVal) {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const duration = 600;
        const stepTime = 20;
        const increment = targetVal / (duration / stepTime);
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
                el.innerHTML = `${Math.round(targetVal)}<span class="scale-max">/100</span>`;
                clearInterval(timer);
            } else {
                el.innerHTML = `${Math.round(current)}<span class="scale-max">/100</span>`;
            }
        }, stepTime);
    }

    function renderColorSystem(colorSystem) {
        const brandList = document.getElementById("brand-colors-list");
        const neutralList = document.getElementById("neutral-colors-list");
        const complianceBadge = document.getElementById("wcag-compliance-badge");

        if (brandList) brandList.innerHTML = "";
        if (neutralList) neutralList.innerHTML = "";

        const colors = [
            { name: "Primary", hex: colorSystem.primary },
            { name: "Secondary", hex: colorSystem.secondary },
            { name: "Accent CTA", hex: colorSystem.accent_cta }
        ];

        colors.forEach(c => {
            const chip = document.createElement("div");
            chip.className = "color-chip";
            chip.style.backgroundColor = c.hex;
            chip.title = `${c.name}: ${c.hex}`;
            chip.innerHTML = `<span class="color-chip-hex">${c.hex}</span>`;
            if (brandList) brandList.appendChild(chip);
        });

        const neutralChip = document.createElement("div");
        neutralChip.className = "color-chip";
        neutralChip.style.backgroundColor = colorSystem.neutral_bg;
        neutralChip.innerHTML = `<span class="color-chip-hex" style="color:#FFF">${colorSystem.neutral_bg}</span>`;
        if (neutralList) neutralList.appendChild(neutralChip);

        if (complianceBadge) complianceBadge.innerText = colorSystem.wcag_compliance;
    }

    function renderCanvasNodes(blueprint) {
        const flowList = document.getElementById("node-flow-list");
        if (!flowList) return;
        flowList.innerHTML = "";

        const heroNode = document.createElement("div");
        heroNode.className = "node-item hero-node";
        heroNode.innerHTML = `
            <div class="node-header">
                <span class="node-tag">Hero Recommendation (Priority 1)</span>
                <span class="node-score bg-blue">${Math.round((blueprint.hero_section.confidence_score || 0.95) * 100)}% Match</span>
            </div>
            <div class="node-body">
                <h4 style="color: var(--indigo-primary); font-family: '${blueprint.typography.heading_font}', serif;">${blueprint.hero_section.recommended_layout}</h4>
                <p class="node-rational">${blueprint.hero_section.rationale}</p>
            </div>
        `;
        flowList.appendChild(heroNode);

        blueprint.sections_architecture.forEach((section) => {
            const node = document.createElement("div");
            node.className = "node-item";
            node.innerHTML = `
                <div class="node-header">
                    <span class="node-tag">${section.section_type} (Priority ${section.order_priority})</span>
                    <span class="node-score bg-gold">${Math.round((section.confidence_score || 0.90) * 100)}%</span>
                </div>
                <div class="node-body">
                    <h4 style="font-family: '${blueprint.typography.heading_font}', serif;">${section.recommended_layout}</h4>
                    <p class="node-rational">${section.rationale}</p>
                </div>
            `;
            flowList.appendChild(node);
        });

        setTimeout(drawCanvasLines, 100);
    }

    function drawCanvasLines() {
        const svg = document.getElementById("canvas-lines");
        if (!svg) return;
        svg.innerHTML = "";
        
        const canvasRect = svg.getBoundingClientRect();
        const nodes = document.querySelectorAll(".node-flow-container .node-item");
        
        for (let i = 0; i < nodes.length - 1; i++) {
            const startRect = nodes[i].getBoundingClientRect();
            const endRect = nodes[i + 1].getBoundingClientRect();
            
            const x1 = (startRect.left + startRect.width / 2) - canvasRect.left;
            const y1 = startRect.bottom - canvasRect.top;
            const x2 = (endRect.left + endRect.width / 2) - canvasRect.left;
            const y2 = endRect.top - canvasRect.top;
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const cpY = y1 + (y2 - y1) / 2;
            path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${cpY}, ${x2} ${cpY}, ${x2} ${y2}`);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", i === 0 ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.08)");
            path.setAttribute("stroke-width", "2.5");
            path.setAttribute("stroke-dasharray", "5,5");
            svg.appendChild(path);
        }
    }

    function renderWireframe(blueprint) {
        const list = document.getElementById("wireframe-sections-list");
        if (!list) return;
        list.innerHTML = "";

        const hFont = blueprint.typography.heading_font;

        const heroBlock = document.createElement("div");
        heroBlock.className = "wireframe-section-block";
        heroBlock.innerHTML = `
            <div class="wireframe-sect-title" style="color: ${blueprint.color_palette.primary}; font-family: '${hFont}', serif;">
                Hero: ${blueprint.hero_section.recommended_layout}
            </div>
            <p class="wireframe-sect-desc">${blueprint.hero_section.rationale}</p>
        `;
        list.appendChild(heroBlock);

        blueprint.sections_architecture.forEach(section => {
            const block = document.createElement("div");
            block.className = "wireframe-section-block";
            block.innerHTML = `
                <div class="wireframe-sect-title" style="font-family: '${hFont}', serif;">
                    ${section.section_type}: ${section.recommended_layout}
                </div>
                <p class="wireframe-sect-desc">${section.rationale}</p>
            `;
            list.appendChild(block);
        });
    }

    function renderChecklists(blueprint) {
        const seoList = document.getElementById("seo-rules-list");
        const mobList = document.getElementById("mobile-rules-list");
        if (seoList) {
            seoList.innerHTML = "";
            blueprint.seo_priority.forEach(r => {
                const li = document.createElement("li");
                li.innerText = r;
                seoList.appendChild(li);
            });
        }
        if (mobList) {
            mobList.innerHTML = "";
            blueprint.mobile_ux_heuristics.forEach(r => {
                const li = document.createElement("li");
                li.innerText = r;
                mobList.appendChild(li);
            });
        }
    }

    // ==========================================
    // API CALLS & VIEW DATA RENDERERS
    // ==========================================
    async function fetchAndRenderBlueprints() {
        const container = document.getElementById("blueprints-cards-grid");
        if (!container) return;
        container.innerHTML = `<p class="text-secondary"><i class="fa-solid fa-spinner fa-spin"></i> Loading blueprints library...</p>`;

        try {
            const res = await fetch("/api/v1/blueprints");
            if (!res.ok) throw new Error("Failed to fetch stored blueprints");
            storedBlueprints = await res.json();

            container.innerHTML = "";
            storedBlueprints.forEach(bp => {
                const card = document.createElement("div");
                card.className = "blueprint-card";
                card.innerHTML = `
                    <div class="bp-card-header">
                        <div>
                            <div class="bp-title">${bp.business_name}</div>
                            <div class="bp-cat">Category: ${bp.category || 'General'} • Archetype: ${bp.archetype}</div>
                        </div>
                        <span class="status-badge-gold">${bp.archetype}</span>
                    </div>
                    <p class="node-rational">Typography: ${bp.typography.heading_font} + ${bp.typography.body_font}</p>
                    <div class="bp-card-actions">
                        <button class="bp-action-btn load-bp-btn" data-id="${bp.id}"><i class="fa-solid fa-folder-open"></i> Load Workspace</button>
                        <button class="bp-action-btn delete-bp-btn" data-id="${bp.id}"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                `;
                container.appendChild(card);
            });

            document.querySelectorAll(".load-bp-btn").forEach(b => {
                b.addEventListener("click", () => {
                    const id = b.dataset.id;
                    const bp = storedBlueprints.find(x => x.id === id);
                    if (bp) {
                        loadBlueprint(bp);
                        switchView("dashboard");
                        showToast(`Loaded blueprint for ${bp.business_name}`);
                    }
                });
            });

            document.querySelectorAll(".delete-bp-btn").forEach(b => {
                b.addEventListener("click", async () => {
                    const id = b.dataset.id;
                    await fetch(`/api/v1/blueprints/${id}`, { method: "DELETE" });
                    showToast("Blueprint deleted");
                    fetchAndRenderBlueprints();
                });
            });

        } catch (err) {
            container.innerHTML = `<p class="text-secondary">Error loading blueprints: ${err.message}</p>`;
        }
    }

    async function fetchAndRenderAssets() {
        const container = document.getElementById("assets-library-grid");
        if (!container) return;
        container.innerHTML = `<p class="text-secondary"><i class="fa-solid fa-spinner fa-spin"></i> Ingesting asset library scores...</p>`;

        try {
            const res = await fetch("/api/v1/assets");
            if (!res.ok) throw new Error("Failed to load asset intelligence");
            const data = await res.json();
            assetLibrary = data.assets;

            container.innerHTML = "";
            assetLibrary.forEach(ast => {
                const card = document.createElement("div");
                card.className = "asset-card";
                card.innerHTML = `
                    <img src="${ast.url}" class="asset-card-thumb" alt="${ast.id}">
                    <div class="asset-card-body">
                        <span class="asset-card-status">${ast.recommendation_status}</span>
                        <h4 class="bp-title" style="margin-top: 4px;">ID: ${ast.id}</h4>
                        <div class="asset-scores-grid">
                            <span>Lighting: <strong>${Math.round(ast.lighting_score * 100)}%</strong></span>
                            <span>Composition: <strong>${Math.round(ast.composition_score * 100)}%</strong></span>
                            <span>Luxury Factor: <strong>${Math.round(ast.luxury_feel_score * 100)}%</strong></span>
                            <span>Contrast: <strong>${ast.contrast_ratio}:1</strong></span>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        } catch (err) {
            container.innerHTML = `<p class="text-secondary">Error loading assets: ${err.message}</p>`;
        }
    }

    // Rich Multi-Section Live Site Draft Preview Renderer
    function renderLiveSitePreview() {
        const container = document.getElementById("site-preview-frame");
        if (!container || !currentBlueprint) return;

        const bp = currentBlueprint;
        const colors = bp.color_palette;
        const typo = bp.typography;

        container.innerHTML = `
            <!-- Live Hero Section -->
            <div class="site-hero-banner" style="background-image: url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80');">
                <div class="site-hero-overlay" style="background: linear-gradient(135deg, ${colors.neutral_bg}E0, ${colors.primary}C0);"></div>
                <div class="site-hero-content">
                    <span style="color: ${colors.accent_cta}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">${bp.archetype} Visual Archetype</span>
                    <h1 style="font-family: '${typo.heading_font}', serif; font-size: 36px; line-height: 1.15; color: ${colors.text_color};">${bp.business_name}</h1>
                    <p style="font-family: '${typo.body_font}', sans-serif; font-size: 14px; color: rgba(255,255,255,0.85);">${bp.hero_section.rationale}</p>
                    <div>
                        <button style="background: linear-gradient(135deg, ${colors.accent_cta}, ${colors.secondary}); color: #000; font-weight: 700; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
                            Reserve Experience
                        </button>
                    </div>
                </div>
            </div>

            <!-- About Narrative Section -->
            <div class="site-preview-section" style="background-color: ${colors.neutral_bg};">
                <h2 style="font-family: '${typo.heading_font}', serif; color: ${colors.secondary}; font-size: 24px; margin-bottom: 8px;">Our Signature Heritage</h2>
                <p style="font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6; max-width: 650px;">
                    Curated bespoke offerings engineered for discerning clients. Designed around spatial harmony, privacy, and high aesthetic prestige.
                </p>
            </div>

            <!-- Services & Packages Tier Section -->
            <div class="site-preview-section" style="background-color: rgba(255,255,255,0.02);">
                <h3 style="font-family: '${typo.heading_font}', serif; color: ${colors.text_color}; font-size: 20px;">Curated Experiences & Tiers</h3>
                <div class="site-packages-grid">
                    <div class="site-pkg-card">
                        <span style="color: ${colors.secondary}; font-size: 12px; font-weight: 600;">ESSENTIAL</span>
                        <div class="site-pkg-price" style="color: ${colors.text_color};">$1,200 <span style="font-size: 12px; color: #9CA3AF;">/ session</span></div>
                        <p style="font-size: 12px; color: #9CA3AF;">Private villa suite access with dedicated concierge service.</p>
                    </div>
                    <div class="site-pkg-card highlighted">
                        <span style="color: ${colors.accent_cta}; font-size: 12px; font-weight: 700;">MOST POPULAR</span>
                        <div class="site-pkg-price" style="color: ${colors.text_color};">$2,800 <span style="font-size: 12px; color: #9CA3AF;">/ stay</span></div>
                        <p style="font-size: 12px; color: #9CA3AF;">Full oceanfront pavilion with private chef sunset dining.</p>
                    </div>
                </div>
            </div>

            <!-- Proof Gallery Section -->
            <div class="site-preview-section" style="background-color: ${colors.neutral_bg};">
                <h3 style="font-family: '${typo.heading_font}', serif; color: ${colors.text_color}; font-size: 20px;">Visual Gallery Proof</h3>
                <div class="site-gallery-grid">
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80" class="site-gallery-item" alt="Gallery item">
                    <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=500&q=80" class="site-gallery-item" alt="Gallery item">
                </div>
            </div>

            <!-- Reservation Contact Section -->
            <div class="site-preview-section" style="background-color: rgba(255,255,255,0.03);">
                <h3 style="font-family: '${typo.heading_font}', serif; color: ${colors.secondary}; font-size: 20px;">Direct Reservation Inquiry</h3>
                <form class="site-contact-form" onsubmit="event.preventDefault(); alert('Demo Reservation Submitted!');">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <textarea rows="3" placeholder="Special Requests / Dates"></textarea>
                    <button type="submit" style="background: ${colors.accent_cta}; color: #000; font-weight: 700; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">
                        Send Booking Request
                    </button>
                </form>
            </div>
        `;
    }

    // Interactive Contrast Calculator
    const calcBtn = document.getElementById("run-contrast-calc");
    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            const bgHex = document.getElementById("calc-bg").value.trim();
            const textHex = document.getElementById("calc-text").value.trim();
            
            const getLuminance = (hex) => {
                hex = hex.replace("#", "");
                const r = parseInt(hex.substring(0,2), 16) / 255;
                const g = parseInt(hex.substring(2,4), 16) / 255;
                const b = parseInt(hex.substring(4,6), 16) / 255;
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            };

            try {
                const l1 = getLuminance(bgHex);
                const l2 = getLuminance(textHex);
                const ratio = ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(1);
                
                const resultBox = document.getElementById("calc-result");
                const passed = ratio >= 7.0;
                resultBox.innerHTML = `Contrast Ratio: <strong>${ratio}:1</strong> — <span class="${passed ? 'text-green' : 'text-orange'}"><i class="fa-solid fa-circle-${passed ? 'check' : 'exclamation'}"></i> WCAG 2.1 ${passed ? 'AAA Passed' : 'AA Standard'}</span>`;
            } catch (e) {
                alert("Please enter valid hex codes (e.g. #0F172A)");
            }
        });
    }

    async function fetchAndRenderAnalytics() {
        try {
            const res = await fetch("/api/v1/analytics");
            if (res.ok) {
                const data = await res.json();
                document.getElementById("stat-latency").innerText = `${data.pipeline_latency_ms} ms`;
                document.getElementById("stat-total-bp").innerText = data.total_blueprints_generated;
            }
        } catch (e) {}
    }

    async function fetchAndRenderSettings() {
        try {
            const res = await fetch("/api/v1/settings");
            if (res.ok) {
                const s = await res.json();
                document.getElementById("set_strict_wcag").checked = s.strict_wcag_aaa;
                document.getElementById("set_weight_light").value = s.hero_weight_lighting;
                document.getElementById("set_autosave").checked = s.auto_save_enabled;
            }
        } catch (e) {}
    }

    const settingsForm = document.getElementById("settings-form");
    if (settingsForm) {
        settingsForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const payload = {
                "strict_wcag_aaa": document.getElementById("set_strict_wcag").checked,
                "hero_weight_lighting": parseFloat(document.getElementById("set_weight_light").value),
                "auto_save_enabled": document.getElementById("set_autosave").checked
            };
            await fetch("/api/v1/settings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            showToast("Engine settings successfully saved!");
        });
    }

    function addNotification(title, sub) {
        const list = document.getElementById("notif-list");
        if (!list) return;
        const item = document.createElement("div");
        item.className = "notif-item unread";
        item.innerHTML = `
            <i class="fa-solid fa-sparkles text-gold"></i>
            <div class="notif-content">
                <span class="notif-title">${title}</span>
                <span class="notif-time">Just now • ${sub}</span>
            </div>
        `;
        list.insertBefore(item, list.firstChild);
        if (notifBadge) notifBadge.style.display = "block";
    }

    function showToast(msg) {
        const toast = document.getElementById("toast-notif");
        if (!toast) return;
        toast.innerText = msg;
        toast.classList.add("active");
        setTimeout(() => toast.classList.remove("active"), 3000);
    }
});
