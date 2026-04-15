# Design System Strategy: Functional Elegance
 
## 1. Overview & Creative North Star: The Architectural Gallerist
This design system is not a template; it is a framework for high-end digital curation. Our "Creative North Star" is **The Architectural Gallerist**. We treat product listings not as items in a grid, but as exhibits in a premium space. 
 
By leveraging intentional asymmetry, expansive white space, and a vibrant, modern color palette, we move away from "standard e-commerce" into the realm of "editorial commerce." The goal is to make the interface disappear so the product photography can breathe, using a hierarchy of light and depth rather than boxes and lines.
 
---
 
## 2. Colors & Tonal Depth
The palette is rooted in a vibrant primary blue (#0097fc), supported by professional secondary blues (#3876d3) and sophisticated tertiary accents (#9a5dbf). The structure is defined by a neutral base (#64779d) that ensures high-energy colors remain grounded.
 
### The "No-Line" Rule
To maintain an editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
*   **Tonal Shifts:** Transitioning from the neutral surface tones to container-specific backgrounds.
*   **Whitespace:** Utilizing the spacing scale (Level 2) to create mental boundaries.
 
### Surface Hierarchy & Nesting
Treat the UI as a physical environment. Instead of a flat grid, use the surface tiers to create depth:
*   **Base Layer:** Neutral backgrounds derived from #64779d.
*   **Sectional Layer:** Surface containers for grouping related content blocks.
*   **Interactive Layer:** Lowest surface containers for primary cards and input fields to make them "pop" forward naturally.
 
### The "Glass & Gradient" Rule
Floating elements (like a sticky header or a Quick-Add drawer) should utilize **Glassmorphism**. Use surface colors with an 80% opacity and a `backdrop-blur` of 20px. 
*   **Signature Textures:** For high-conversion CTAs, use a subtle linear gradient from `primary` (#0097fc) to `secondary` (#3876d3) at a 135-degree angle. This adds a "weighted" feel that flat hex codes lack.
 
---
 
## 3. Typography: The Editorial Voice
We utilize **Public Sans** for its clean, neutral, and highly scalable characteristics across headlines, body text, and labels.
 
*   **The Power of Scale:** Use `display-lg` (3.5rem) for hero sections, but pair it with `label-md` (0.75rem) in all-caps with 0.1em letter spacing for sub-headers. This high-contrast pairing mimics high-fashion magazines.
*   **Hierarchy:**
    *   **Headlines:** `headline-lg` (2rem) should be used for category titles to command attention.
    *   **Product Names:** `title-lg` (1.375rem) provides enough weight to stand out next to high-res imagery.
    *   **Body Copy:** `body-md` (0.875rem) is our workhorse for descriptions, ensuring legibility without clutter.
 
---
 
## 4. Elevation & Depth: Tonal Layering
Traditional shadows often look "muddy" on clean white interfaces. We achieve hierarchy through light and stacking.
 
*   **The Layering Principle:** Place a light container card on top of a neutral-tinted background. This creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a multi-layered shadow:
    *   `box-shadow: 0 10px 30px rgba(0, 151, 252, 0.04), 0 20px 60px rgba(0, 151, 252, 0.08);`
    *   *Note: The shadow color is a tint of our `primary` (#0097fc) to ensure it feels like natural light.*
*   **The "Ghost Border" Fallback:** In high-density data views where a border is unavoidable, use the neutral-variant outlines at low opacity. It should be felt, not seen.
 
---
 
## 5. Components
 
### Buttons: Tactile Sophistication
*   **Primary:** Solid `primary` (#0097fc) background with `on_primary` text. Use a subtle corner radius (Level 1) for a modern, slightly sharp but stable feel.
*   **Secondary:** `secondary` (#3876d3) or container background with `primary` text. No border.
*   **Tertiary:** Pure text using `tertiary` (#9a5dbf) color, underlined only on hover.
 
### Tactile Cards
Cards are the heart of this design system. 
*   **Rule:** Forbid divider lines. Use consistent background transitions for the card body. 
*   **Imagery:** The image should be flush to the top. Use a subtle 0.5s ease-in-out scale effect on the image when the card is hovered.
*   **Spacing:** Use Level 2 internal padding to ensure the content doesn't feel cramped.
 
### Input Fields
*   **State:** Default state is a clean surface with a `ghost border`. 
*   **Focus:** Transition the border to `primary` (#0097fc) at 100% opacity and apply a soft halo of the primary color at reduced opacity.
 
### Department Icons
*   **Style:** Use thin-stroke (1.5px) linear icons. Avoid filled icons unless in an "active" state to maintain a "light" visual weight.
 
---
 
## 6. Do's and Don'ts
 
### Do:
*   **Use Asymmetry:** Place a product image off-center with a `display-md` headline overlapping it slightly to create an editorial layout.
*   **Prioritize Negative Space:** If you think there is enough padding, add more. White space is a luxury signal.
*   **Tonal Transitions:** Use dimmed neutral tones for footer backgrounds to anchor the page.
 
### Don't:
*   **Don't use 100% Black:** Always use `on_surface` or dark neutrals to keep the contrast high but readable.
*   **Don't use Default Shadows:** Avoid the standard `0 2px 4px rgba(0,0,0,0.5)`. It looks cheap and dated.
*   **No Grid-Lock:** Don't feel forced to align every single element to a strict vertical line; allow "hero" elements to break the container to create visual flow.
*   **No Dividers:** Never use a `
` or 1px line to separate list items. Use vertical space or a shift in surface tone.
