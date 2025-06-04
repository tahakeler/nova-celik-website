# NovaCelik Website

This repository contains the public website for **NOVACELIK Company Limited**. It is built with Next.js, TypeScript and Tailwind CSS and includes a dynamic blog, interactive dashboard and marketing pages.

## Getting Started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

### Blog Generation

The `scripts/generate_blogs.py` script fetches articles from the GNews API and updates `src/data/blog.ts`.

```bash
export GNEWS_API_KEY=your_api_key
python scripts/generate_blogs.py
```

Optional variables:

- `GNEWS_QUERY` – search keywords (default: `"energy efficiency OR sustainability OR renewable"`)
- `GNEWS_LANG` – language code (default: `"en"`)

## Documentation

Refer to [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) for design conventions and coding standards.
