from typing import List, Optional, Dict
from enum import Enum
from pydantic import BaseModel, Field, HttpUrl

class BrandStyle(str, Enum):
    LUXURY = "Luxury"
    MODERN = "Modern"
    TRADITIONAL = "Traditional"
    CORPORATE = "Corporate"
    ELEGANT = "Elegant"

class ImageAsset(BaseModel):
    id: str
    url: HttpUrl
    lighting_score: float = Field(..., ge=0.0, le=1.0, description="Lighting quality score (0-1)")
    composition_score: float = Field(..., ge=0.0, le=1.0, description="Composition quality score (0-1)")
    contrast_ratio: float = Field(..., ge=0.0, le=21.0, description="Relative contrast ratio (0-21)")
    is_dark_background: bool = Field(..., description="Flag indicating if the image has a dark background")
    luxury_feel_score: float = Field(..., ge=0.0, le=1.0, description="Luxury and prestige style score (0-1)")
    subject_alignment: str = Field(default="center", description="Subject alignment in image: left, right, or center")

class ClientQuestionnaire(BaseModel):
    business_name: str = Field(..., min_length=1)
    business_category: str = Field(..., min_length=1)
    target_audience: str = Field(..., min_length=1)
    location: str = Field(..., min_length=1)
    brand_colors_hex: List[str] = Field(..., min_items=1, description="List of brand hex colors")
    services: List[str] = Field(..., min_items=1, description="Key services offered")
    packages: List[Dict[str, str]] = Field(..., min_items=1, description="List of service packages with details")
    images: List[ImageAsset] = Field(..., min_items=1, description="List of analyzed image assets")
    logo_url: Optional[HttpUrl] = None
    competitor_urls: Optional[List[HttpUrl]] = None
    google_business_info: Optional[Dict[str, str]] = Field(None, description="Optional Google Business metadata")
    meeting_notes: Optional[str] = Field(None, description="Meeting notes or client brief")

class TypographyRecommendation(BaseModel):
    heading_font: str
    body_font: str
    font_type: str  # Serif, Sans, Mixed
    rationale: str
    details: Dict[str, str] = Field(default_factory=dict, description="Recommended font weights and sizes")

class ColorSystem(BaseModel):
    primary: str
    secondary: str
    accent_cta: str
    neutral_bg: str
    text_color: str
    wcag_compliance: str
    contrast_ratios: Dict[str, float] = Field(default_factory=dict, description="Luminance contrast ratio values")

class SectionRecommendation(BaseModel):
    section_id: str
    section_type: str
    recommended_layout: str
    order_priority: int
    assigned_images: List[str]
    cta_placement: Optional[str] = None
    heading_position: Optional[str] = None
    rationale: str
    confidence_score: float = Field(..., ge=0.0, le=1.0)

class UXWebsiteBlueprint(BaseModel):
    business_name: str
    archetype: BrandStyle
    typography: TypographyRecommendation
    color_palette: ColorSystem
    hero_section: SectionRecommendation
    sections_architecture: List[SectionRecommendation]
    seo_priority: List[str]
    mobile_ux_heuristics: List[str]
    design_scores: Dict[str, int] = Field(default_factory=dict, description="Automated scores for layout analysis")
