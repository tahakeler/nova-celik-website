# Responsive Design Guide

This project uses **Tailwind CSS** utility classes with Flexbox and CSS Grid for all layout structures. Components should avoid fixed pixel dimensions and instead rely on responsive units like `rem`, `%`, and viewport units.

## Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Use Tailwind's breakpoint prefixes (`sm:`, `md:`, etc.) to apply styles at specific widths.

## Testing

Layouts should be manually verified with browser developer tools or services like BrowserStack on the following sizes:

- Mobile: 375px and 414px wide
- Tablet: 768px wide
- Desktop: 1024px and above

Smoke tests can be run with Playwright or Cypress to automate navigation and menu interactions.

