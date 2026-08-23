# KHOUSH Homepage Design Context

## North Star

A feminine, editorial creative-agency homepage with a confident Doha presence: black cinematic stages, warm ivory content fields, champagne and burnished gold, restrained maroon micro-accents, generous breathing room, and visibly crafted motion.

## Brand Register

- Voice: direct, reassuring, strategic, creatively confident.
- Signature: interactive ornamental current-year artwork with botanical linework.
- Rhythm: dark hero and brand statement alternating with spacious light editorial sections.
- About-section hierarchy relies on scale, whitespace and soft tonal surfaces rather than outlined containers or long explanatory copy.
- Alignment: narrative and service sections stay left-aligned on mobile; the complete hero composition, brand manifesto and consultation introduction use a deliberate centered axis.
- Imagery: premium campaign photography with fashion, hospitality, sport, and lifestyle energy. Gallery subjects must visibly match strategic planning, customer insight, audience targeting, brand systems, campaign production, and social growth.

## Tokens

- Ink: `#202020`; stage: `#000000`; soft stage: `#0b0a0a`.
- Paper: `#f8f7f4`; champagne: `#f4c151`; pale gold: `#ffe994`.
- Structural maroon: `#8c0000`. Pale pink is excluded from interface text, card backgrounds and hover states; interactive light and text use champagne gold.
- Primary interaction and emphasis use champagne or burnished gold; maroon is limited to small structural labels and validation states.
- Display type: Foro; interface/body type: Satoshi.
- Corners: 22–36px for editorial cards; pill controls for primary actions.
- Spacing: fluid page gutter `clamp(20px, 3.35vw, 64px)` and 75–140px section cadence.

## Interaction Contract

- Current year is derived from `Date().getFullYear()` and updates the visible SVG, clipping masks, accessible label, and copyright.
- Year artwork responds to pointer movement, keyboard focus, and tap/click bloom; reduced-motion removes parallax and transitions.
- Work gallery is horizontally scrollable with semantic previous/next controls and touch scrolling.
- Growth story uses one editorial image at a time with concise, non-repeating captions, keyboard controls, paused-on-focus autoplay, and a reduced-motion static state.
- Research, service and testimonial cards use restrained pointer tilt and local light-follow effects; their meaning and controls never depend on motion.
- Service iconography is subject-specific: compass for strategy, modular grid for identity, camera for content, and growth chart for social media.
- Consultation form owns validation, associates text errors with fields, focuses the first error, and hands the completed brief to email.
- WhatsApp is a fixed expandable control with click-outside and Escape dismissal.
- Footer is a fixed reveal layer beneath the main page and preserves a stable reserved height.

## Responsive Contract

- Desktop hero uses a three-part editorial composition. At `1000px` and below it becomes a centered linear narrative with the headline first, the interactive current-year artwork second, and the thesis third while preserving semantic source order.
- All grids collapse without removing content or actions.
- On mobile, every card collection with more than two items becomes a native swipe carousel with scroll snapping and a visible next-card preview; desktop retains its full grid.
- Every mobile card carousel exposes consistent previous/next controls, a visible swipe cue and a live item counter; arrow targets are at least 44px.
- Gallery cards remain touch-scrollable and expose their labels without hover on mobile.
- Contact form becomes one column and map actions remain reachable.

## Search & Entity Contract

- Canonical homepage: `https://khoush.com/` with one self-referencing canonical URL.
- Business entity name: `Khoush Advertising & Marketing`.
- Verified map coordinates: `25.2777707030644, 51.492684642328484`.
- Visible content and JSON-LD consistently describe the business as a creative advertising, social media, branding, content creation and digital marketing agency in Doha, Qatar.
- Crawlable destinations use semantic anchors; interface actions remain semantic buttons for valid keyboard and accessibility behavior.
- Root `robots.txt` permits crawling and references the root XML sitemap.

## Anti-References

- No generic SaaS gradients, glass dashboard cards, bright neon, or emoji decoration.
- No unverified KHOUSH client logos or project claims.
- No fixed year, false links, hover-only information, or motion without a reduced-motion path.
