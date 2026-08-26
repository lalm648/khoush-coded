# KHOUSH Homepage Design Context

## North Star

A feminine, editorial creative-agency homepage with a confident Doha presence: deep forest stages, warm ivory content fields, muted gold details, generous breathing room, and visibly crafted motion.

## Brand Register

- Voice: direct, problem-first, outcome-oriented, reassuring, strategic, and creatively confident. Avoid generic agency claims, vanity metrics, and invented proof.
- Signature: an interactive campaign signal that connects strategy, creative, media and growth around one focused idea.
- Rhythm: dark hero and brand statement alternating with spacious light editorial sections.
- About-section hierarchy relies on scale, whitespace and soft tonal surfaces rather than outlined containers or long explanatory copy.
- Alignment: narrative and service sections stay left-aligned on mobile; the complete hero composition, brand manifesto and consultation introduction use a deliberate centered axis.
- Imagery: premium campaign photography with fashion, hospitality, sport, and lifestyle energy. Gallery subjects must visibly match marketing strategy, brand identity, creative campaigns, content production, social media, and digital advertising.
- Testimonials and client logos remain absent until KHOUSH provides approved, verifiable client assets and statements.

## Tokens

- Strategic ink: `#16302b`; deep forest stage: `#03110d`; soft forest stage: `#071a15`.
- Warm ivory paper: `#f5f1e9`; muted gold: `#a38560`; pale gold: `#cbb795`.
- Pure black, maroon and pale pink are excluded from interface text, card backgrounds and hover states.
- Primary interaction and emphasis use muted or pale gold; green provides structure, depth and continuity.
- Display type: Foro; interface/body type: Satoshi.
- Section titles share one `clamp(42px, 4vw, 68px)` scale at weight 600 and 1.02 line-height; mobile section titles use 39px. The hero remains the only independent display scale.
- Narrative copy uses 16px/1.75 on desktop and 15px/1.75 on mobile; card copy uses 14px/1.7.
- Corners: 22–36px for editorial cards; pill controls for primary actions.
- Spacing: fluid page gutter `clamp(20px, 3.35vw, 64px)` with a tighter `14px` mobile override, 24px desktop card gaps, 14px mobile carousel gaps, and a 64–116px section cadence based on narrative or stage context.

## Interaction Contract

- The interactive campaign signal responds to pointer movement, keyboard focus and tap/click activation; reduced-motion removes parallax and transitions.
- Current year is derived from `Date().getFullYear()` for the copyright only; the hero remains evergreen and campaign-focused.
- Work gallery is horizontally scrollable with semantic previous/next controls and touch scrolling.
- Growth story uses one editorial image at a time with concise, non-repeating captions, keyboard controls, paused-on-focus autoplay, and a reduced-motion static state.
- Process and service cards use restrained pointer tilt and local light-follow effects; their meaning and controls never depend on motion.
- Service iconography is subject-specific: compass for strategy, modular grid for identity, camera for content, and growth chart for social media.
- Consultation form owns validation, associates text errors with fields, focuses the first error, and hands the completed brief to email.
- WhatsApp is a fixed expandable control with click-outside and Escape dismissal.
- Footer is a fixed reveal layer beneath the main page and preserves a stable reserved height.

## Responsive Contract

- Desktop hero uses a three-part editorial composition. At `1000px` and below it becomes a centered linear narrative with the headline first, the interactive campaign signal second, and the thesis third while preserving semantic source order.
- All grids collapse without removing content or actions.
- On mobile, every card collection with more than two items becomes a native swipe carousel with scroll snapping and a visible next-card preview; desktop retains its full grid.
- Every mobile card carousel exposes consistent previous/next controls, a visible swipe cue and a live item counter; arrow targets are at least 44px.
- Mobile service cards use a restrained next-card preview, content-driven height and 20px bottom padding so they stay close to the page rhythm without empty lower space.
- Mobile principle cards use the same restrained next-card preview width as services, keeping the Clarity card close to the right edge.
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
