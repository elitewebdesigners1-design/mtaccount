# Layout polish & performance pass

Goal: keep the current Noir & Gold design, tighten the layout so it reads well at every width, and make the page load faster.

## Layout refinements

- **Consistent rhythm**: unify section padding to one scale (`py-20 sm:py-28 lg:py-32`) and one container (`max-w-7xl px-5 sm:px-8 lg:px-10`) so sections stop drifting apart on wide screens.
- **Hero**: cap headline width for readability, reduce top padding on short viewports so the CTA buttons stay above the fold on laptops (e.g. 944x588), and make the button row stack full-width on very small phones.
- **Header**: keep the grid header, but make the mobile menu scroll-safe and close on link tap; add a subtle border only after scroll.
- **About / Services / Gallery / Tracker / Contact**: add `min-w-0` on text columns, `truncate`/`break-words` on long values (phone, email, license number), and even card heights within each grid row.
- **Gallery**: keep 4:3 crops, switch to a 1 / 2 / 3 column ramp so tablets don't get squeezed thirds.
- **Contact form**: two-column fields collapse cleanly, labels tied to inputs, larger tap targets on mobile.
- **Footer**: 1 / 2 / 3 column ramp instead of jumping straight to three.

## Performance

- Hero image: mark as eager with `fetchPriority="high"` and add a preload link so the first paint isn't blank; all other images stay `loading="lazy"` and gain `decoding="async"` plus explicit `width`/`height` to remove layout shift.
- Add `alt` text audit for accessibility and SEO.

## Technical notes

All changes are presentational and stay inside `src/routes/index.tsx` plus a small token/spacing addition in `src/styles.css`. No business logic, data, or content changes. Verified after the edit with a build and a browser pass at mobile, tablet, and the current 944px viewport.
