# Navigo Nepal — Home Page Design System & Style Guide (`design.md`)

This document serves as the complete technical specification for the design system, color palette, typography, CSS variables, theme system, **content alignment (headings, paragraphs, images)**, and component layout used on the **Navigo Nepal** home page (`index.html` & `css/style.css`).

---

## 1. Aesthetic Philosophy & Overview

- **Design Tone**: International-Grade Editorial, Clean, Professional, and High-Contrast Youth-Empowerment Platform.
- **Inspiration**: Global institutional standards (UNESCO, UNICEF, Gates Foundation, TED).
- **Architecture**: Dual-theme system (Light Mode default with a Dark Mode via `[data-theme="dark"]`).
- **Hero Aesthetic**: Dark editorial cover look (`#0A0A0A` background) featuring a grayscale image slideshow/video overlay, vibrant 4-color block accent bars, and sharp-cornered action buttons.

---

## 2. Color Palette & CSS Color System

### 2.1 Core Brand Colors

| Color Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#0A2342` | `rgb(10, 35, 66)` | Light mode text, primary dark background sections, headers |
| **Deep Navy** | `#06172F` | `rgb(6, 23, 47)` | Dark mode body background, dark section base |
| **Elite Blue** | `#2563EB` | `rgb(37, 99, 235)` | Primary accent color, primary buttons, highlights |
| **Luxury Blue** | `#4F9CF9` | `rgb(79, 156, 249)` | Secondary accent light, dark mode accent color |
| **Soft Sky** | `#DCEEFF` | `rgb(220, 238, 255)` | Light accent background glow |
| **Emerald Green** | `#10B981` | `rgb(16, 185, 129)` | Accent green, success indicators, gradients |
| **Teal Accent** | `#2A9D8F` | `rgb(42, 157, 143)` | Nav active bar, green hero block CTA button |
| **Warm Yellow / Amber**| `#F4A261` | `rgb(244, 162, 97)` | Yellow hero block CTA button, theme toggle hover |
| **Crimson Red** | `#E63946` | `rgb(230, 57, 70)` | Accent bar segment, map hover highlight (`#dc2626`) |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Card backgrounds, inverse text, hero title |
| **Luxury Light BG** | `#F8FBFF` | `rgb(248, 251, 255)` | Page body background (Light Mode) |
| **Soft Gray (Muted)** | `#64748B` | `rgb(100, 116, 139)` | Subtitles, muted body text, borders |

---

### 2.2 CSS Variables & Dual-Theme Tokens (`:root` vs `[data-theme="dark"]`)

```css
/* ==================== CSS CUSTOM PROPERTIES ==================== */
:root {
  /* Brand Core Palette */
  --primary-navy: #0A2342;
  --deep-navy: #06172F;
  --luxury-blue: #4F9CF9;
  --soft-sky: #DCEEFF;
  --elite-blue: #2563EB;
  --emerald: #10B981;
  --pure-white: #FFFFFF;
  --luxury-bg: #F8FBFF;
  --soft-gray: #64748B;

  /* Semantic Tokens (Light Mode Default) */
  --bg-primary: #F8FBFF;
  --bg-secondary: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-navbar: rgba(255, 255, 255, 0.92);
  --border-color: rgba(10, 35, 66, 0.08);
  --border-glass: rgba(79, 156, 249, 0.15);

  --text-main: #0A2342;
  --text-muted: #64748B;
  --text-inverse: #FFFFFF;

  --accent-color: #2563EB;
  --accent-light: #4F9CF9;
  --accent-emerald: #10B981;
  --secondary-color: #0A2342;

  --gradient-primary: linear-gradient(135deg, #2563EB 0%, #4F9CF9 100%);
  --gradient-hero: linear-gradient(135deg, #0A2342 0%, #1a3a5c 50%, #06172F 100%);
  --gradient-accent: #2563EB;
  --gradient-card: linear-gradient(180deg, rgba(37, 99, 235, 0.03) 0%, rgba(10, 35, 66, 0.03) 100%);
  --gradient-subtle: linear-gradient(180deg, rgba(37, 99, 235, 0.02) 0%, transparent 100%);

  --glow-1: rgba(79, 156, 249, 0.08);
  --glow-2: rgba(37, 99, 235, 0.05);
  --shadow-sm: 0 1px 3px rgba(10, 35, 66, 0.06);
  --shadow-md: 0 4px 20px rgba(10, 35, 66, 0.08);
  --shadow-lg: 0 12px 40px rgba(10, 35, 66, 0.1);
  --shadow-xl: 0 25px 60px rgba(10, 35, 66, 0.12);
  --shadow-glow: 0 0 30px rgba(37, 99, 235, 0.15);

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

[data-theme="dark"] {
  --bg-primary: #06172F;
  --bg-secondary: #0A2342;
  --bg-card: #0d2a4a;
  --bg-navbar: rgba(6, 23, 47, 0.95);
  --border-color: rgba(255, 255, 255, 0.08);
  --border-glass: rgba(79, 156, 249, 0.2);

  --text-main: #F0F6FF;
  --text-muted: #8BA3C4;
  --text-inverse: #0A2342;

  --accent-color: #4F9CF9;
  --accent-light: #7BB8FF;
  --accent-emerald: #34D399;
  --secondary-color: #F0F6FF;

  --gradient-primary: linear-gradient(135deg, #4F9CF9 0%, #7BB8FF 100%);
  --gradient-card: linear-gradient(180deg, rgba(79, 156, 249, 0.05) 0%, rgba(13, 42, 74, 0.05) 100%);
  --gradient-subtle: linear-gradient(180deg, rgba(79, 156, 249, 0.03) 0%, transparent 100%);

  --glow-1: rgba(79, 156, 249, 0.12);
  --glow-2: rgba(79, 156, 249, 0.08);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 25px 60px rgba(0, 0, 0, 0.35);
  --shadow-glow: 0 0 40px rgba(79, 156, 249, 0.2);
}
```

---

## 3. Typography System

### 3.1 Font Families

1. **Display Hero Font**: `'Bebas Neue', sans-serif`
   - Used for the primary uppercase hero title.
2. **Headings Font**: `'Plus Jakarta Sans', sans-serif`
   - Weights used: `300`, `400`, `500`, `600`, `700` (Bold), `800` (Extra Bold).
3. **Body & UI Font**: `'Inter', sans-serif`
   - Weights used: `300`, `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold).
4. **Auxiliary Editorial Fonts**: `'Manrope', sans-serif`, `'Outfit', sans-serif`.

```html
<!-- Google Fonts Import -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

### 3.2 Type Scale & Heading Hierarchy

| Element / Class | Font Family | Size | Weight | Line Height | Letter Spacing | Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** (`.hero-map-title`) | `Bebas Neue` | `clamp(2.8rem, 5.5vw, 5rem)` | `400` | `1.0` | `0.03em` | Uppercase |
| **Heading XL** (`.heading-xl`) | `Plus Jakarta Sans` | `clamp(2.8rem, 5.5vw, 4.5rem)` | `800` | `1.08` | `-0.03em` | Default |
| **Heading LG** (`.heading-lg`) | `Plus Jakarta Sans` | `clamp(2rem, 4vw, 3rem)` | `700` | `1.12` | `-0.02em` | Default |
| **Base Headings** (`h1`-`h6`) | `Plus Jakarta Sans` | Responsive | `700` | `1.15` | `-0.02em` | Default |
| **Body Text** (`body`) | `Inter` | `1rem` (Base) | `400` | `1.7` | Normal | Default |
| **Section Label** (`.section-label`) | `Inter` | `0.8rem` | `600` | Normal | `0.15em` | Uppercase |
| **Nav Links** (`.nav-link`) | `Inter` | `0.82rem` | `600` | Normal | `0.05em` | Uppercase |
| **Hero Accent CTAs** | `Inter` | `0.82rem` | `700` | Normal | `0.06em` | Uppercase |

---

## 4. Heading, Paragraph & Image Alignment System

This section details **how headings, paragraphs, and images are lined up and aligned** across desktop, tablet, and mobile viewports.

---

### 4.1 Content Block Vertical Stacking Sequence

In every major section, content follows a strict, consistent vertical ordering:

1. **Top Accent Segment / Eyebrow**:
   - Multi-color accent bar (`.hero-accent-bar` / `.cr-accent-bar`) OR uppercase Section Eyebrow (`.section-label` / `.cr-eyebrow`).
   - Placed directly above the main heading with a bottom margin of `1rem` to `1.25rem`.
   - Includes a horizontal gradient indicator line (`::before` pseudo-element, `24px` x `2px`).
2. **Primary Section Heading (`h1`, `h2`, `.heading-xl`, `.hero-map-title`)**:
   - Positions immediately below the eyebrow.
   - Uses tight line height (`1.0` to `1.15`) to keep multi-line titles visually grouped.
   - Spacing below heading: `margin-bottom: 1.25rem` to `1.5rem`.
3. **Sub-title / Description Paragraph (`p`, `.hero-map-subtitle`, `.cr-intro-text`)**:
   - Placed directly underneath the heading.
   - **Line Height**: `1.7` to `1.85` for high legibility.
   - **Width Limit**: Constrained to a max width of `540px` to `650px` to prevent overly long line lengths.
   - **Color**: `rgba(255, 255, 255, 0.72)` in dark hero mode; `var(--text-muted)` (`#64748B` light / `#8BA3C4` dark) in section cards.
4. **Action Group / CTAs (`.hero-map-ctas`, `.btn-group`)**:
   - Positioned below the paragraph with a margin top of `2rem` to `2.5rem`.
   - Uses `display: flex`, `align-items: center`, `gap: 1rem` (or `gap: 0` for attached editorial block buttons).

---

### 4.2 Horizontal Alignment Rules

#### 1. Split Layouts (Text Left + Media Right)
- **Class / Component**: `.hero-map-container`, `.grid-2`, `.cr-inner`.
- **Desktop (>= 992px)**:
  - Text block (`.hero-map-text`, `.cr-right-content`) is **left-aligned** (`text-align: left`).
  - Accent bars align to the left start edge (`justify-content: flex-start`).
  - Image / Media visual (`.hero-map-visual`, `.cr-left-collage`) is aligned to the right side (`align-items: center`, `justify-content: center`).
  - Horizontal Gap between Text and Image: `5rem` (`gap: 5rem`).

```
+-------------------------------------------------------+
|  [=== Accent Line ===]                                 |
|  EYEBROW LABEL                                        |  +-----------------------+
|  HEADING TITLE (Left Aligned)                         |  |                       |
|  Paragraph description text goes here and is limited  |  |     IMAGE / MEDIA     |
|  to 540px width for maximum readability.              |  |        VISUAL         |
|                                                       |  |                       |
|  [ CTA BUTTON 1 ]  [ CTA BUTTON 2 ]                   |  +-----------------------+
+-------------------------------------------------------+
```

#### 2. Centered Hero & Feature Header Sections
- **Class**: `.section-header`, `.text-center`.
- **Desktop & Mobile**:
  - `text-align: center`.
  - Accent eyebrow lines and labels centered using `margin-left: auto; margin-right: auto;`.
  - Paragraph description constrained with `max-width: 650px; margin: 0 auto 3rem;`.

---

### 4.3 Image Layout & Masking Patterns

#### 1. Geographic Nepal Shape Masked Video / Image Visual (`.hero-map-photo`)
- **Structure**: Overlaid background video clipped into the exact geographic outline of Nepal.
- **Implementation**:
  ```css
  .hero-map-photo {
    position: relative;
    width: 100%;
    z-index: 2;
    -webkit-mask-image: url('../assets/nepal.png');
    mask-image: url('../assets/nepal.png');
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }
  ```
- **SVG Overlay**: An inverted SVG line outline (`extracted_map.svg`) aligned absolutely over the masked media (`opacity: 0.12; mix-blend-mode: screen;`).
- **Background Glow**: Radial glow (`.hero-map-glow`) centered behind the visual with `filter: blur(40px)`.

#### 2. Triple Diagonal Capsule Masked Photo Collage (`.cr-left-collage`)
- **Structure**: Left-side media block in the "Challenge & Response" section.
- **Masking Mechanism**: Uses an SVG `<mask id="capsule-mask">` with three rounded rectangles rotated collectively at `-30deg`.
- **Image Fit**: Image set to `width: 100%; height: 100%; object-fit: cover;`.

#### 3. Standard Card Images (`.program-card`, `.feature-card`)
- **Container**: Image wrapper with fixed height (`200px` to `240px`), `overflow: hidden`, and `border-radius: var(--radius-lg) var(--radius-lg) 0 0`.
- **Media Behavior**: `img { width: 100%; height: 100%; object-fit: cover; display: block; }`.
- **Hover Scale Effect**: On card hover, image scales up smoothly (`transform: scale(1.05); transition: transform 0.5s ease;`).

---

### 4.4 Responsive Mobile Stacking Matrix (Breakpoints)

On screen widths `<= 992px`, all side-by-side (2-column) grid layouts collapse into a **single vertically stacked column**:

| Viewport Width | Text Alignment | Accent Bar Alignment | Media / Image Alignment & Sizing |
| :--- | :--- | :--- | :--- |
| **Desktop** (`>= 992px`) | Left-aligned (`text-align: left`) | Left (`justify-content: flex-start`) | Right column (`width: 900px`, `max-width: 80vw`) |
| **Tablet** (`576px - 992px`)| Center-aligned (`text-align: center`) | Centered (`justify-content: center`) | Stacks below text, centered (`max-width: 400px`, `margin: 0 auto`) |
| **Mobile** (`< 576px`) | Center-aligned (`text-align: center`) | Centered (`justify-content: center`) | Stacks below text, centered (`max-width: 320px`), reduced title font size (`2rem`) |

```css
/* Responsive Mobile Collapsing Rules */
@media (max-width: 992px) {
  .hero-map-container {
    flex-direction: column;
    padding-top: 7rem;
    gap: 3rem;
  }
  .hero-map-text {
    max-width: 100%;
    text-align: center;
  }
  .hero-accent-bar {
    justify-content: center;
  }
  .hero-map-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-map-ctas {
    justify-content: center;
  }
  .hero-map-visual {
    width: 100%;
    max-width: 400px;
  }
}
```

---

## 5. Visual Accents, Lighting & Gradients

### 5.1 Multi-Segment Hero Accent Bar
Located above the hero main headline:

```css
.hero-accent-bar {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
}
.hero-accent-segment {
  width: 40px;
  height: 5px;
}
.hero-accent-red    { background: #E63946; } /* Crimson */
.hero-accent-yellow { background: #F4A261; } /* Amber Yellow */
.hero-accent-green  { background: #2A9D8F; } /* Teal Green */
.hero-accent-blue   { background: #2563EB; } /* Elite Blue */
```

### 5.2 Ambient Glowing Orbs

```css
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.5;
  pointer-events: none;
}
.orb-blue {
  width: 500px;
  height: 500px;
  background: var(--glow-1); /* rgba(79, 156, 249, 0.08) */
}
.orb-green {
  width: 400px;
  height: 400px;
  background: var(--glow-2); /* rgba(37, 99, 235, 0.05) */
}
```

---

## 6. Key Components Specification

### 6.1 Sticky Navigation Bar (`.navbar`)

- **Positioning**: `fixed`, `top: 0`, `width: 100%`, `z-index: 1000`.
- **Background**: `rgba(10, 10, 10, 0.65)` with `backdrop-filter: blur(20px)`.
- **Scrolled State**: `rgba(10, 10, 10, 0.88)` with `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4)`.
- **Nav Link Active Indicator**: 2px bottom underline in `#2A9D8F` (Teal).
- **Dropdown Menu**: `#111111` background, 1px white border (`rgba(255, 255, 255, 0.1)`), smooth slide down animation.

---

### 6.2 Button System

#### 1. Primary Button (`.btn-primary`)
- **Background**: `var(--gradient-primary)` (`linear-gradient(135deg, #2563EB 0%, #4F9CF9 100%)`)
- **Text Color**: `#FFFFFF`
- **Border Radius**: `8px` (`var(--radius-md)`)
- **Box Shadow**: `0 4px 15px rgba(37, 99, 235, 0.3)`
- **Hover**: `transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 30px rgba(37, 99, 235, 0.4);`

#### 2. Hero Editorial Block Buttons (`.hero-btn-accent`)
- **Shape**: Sharp rectangular (`border-radius: 0px`)
- **Font**: Uppercase, `weight: 700`, `letter-spacing: 0.06em`
- **Green Variant (`.hero-btn-green`)**: Background `#2A9D8F`, hover `#21867a`, shadow `0 8px 25px rgba(42, 157, 143, 0.35)`.
- **Yellow Variant (`.hero-btn-yellow`)**: Background `#F4A261`, hover `#e08e4a`, shadow `0 8px 25px rgba(244, 162, 97, 0.35)`.

---

### 6.3 Glassmorphic Cards & Panels (`.glass-panel`)

```css
.glass-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg); /* 12px */
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-panel-hover:hover {
  border-color: var(--accent-color);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(37, 99, 235, 0.05);
  transform: translateY(-4px);
}
```

---

### 6.4 Tab System (`.tabs-container` & `.project-tab`)

```css
.project-tab {
  padding: 0.8rem 1.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0px; /* Editorial Sharp Corners */
  cursor: pointer;
  transition: all 0.3s ease;
}

.project-tab:hover,
.project-tab.active {
  color: var(--pure-white);
  background: var(--accent-color); /* #2563EB */
  border-color: var(--accent-color);
  box-shadow: var(--shadow-md);
}
```

---

## 7. Summary Checklist for Developers & Designers

- [x] **Headings Alignment**: Left-aligned on desktop split grids (`>= 992px`), center-aligned on mobile (`< 992px`) and standalone section headers.
- [x] **Paragraph Constraints**: Max-width capped at `540px`-`650px` for optimal readability, positioned below headings with `1.7`-`1.85` line height.
- [x] **Image Masking & Media Fit**: Video masked into Nepal map shape via CSS `-webkit-mask-image`, photo collages clipped via diagonal capsule SVG masks.
- [x] **Responsive Grid Collapsing**: Side-by-side grids collapse into a single column on screen widths `<= 992px` with centered text and centered stacked images.
- [x] **Typography & Color Tokens**: Heading fonts (`Plus Jakarta Sans` / `Bebas Neue`), Body font (`Inter`), CSS Variables for Light/Dark themes (`:root` vs `[data-theme="dark"]`).
