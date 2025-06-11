# NovaCelik Website

This repository contains the public website for **NOVACELIK Company Limited**. It is built with Next.js, TypeScript and Tailwind CSS and includes a dynamic blog, interactive dashboard and marketing pages.

## Getting Started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

The build process runs a static asset check before compiling:

```bash
npm run prebuild && npm run build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

### Blog Generation

The `scripts/generate_blogs.py` script fetches articles from the GNews API and updates `src/modules/blog/data/blog.ts`.

```bash
pip install -r requirements.txt
export GNEWS_API_KEY=your_api_key
python scripts/generate_blogs.py
```

Optional variables:

- `GNEWS_QUERY` – search keywords (default: `"energy efficiency OR sustainability OR renewable"`)
- `GNEWS_LANG` – language code (default: `"en"`)
- `GNEWS_NUM_POSTS` – number of articles to fetch (default: `50`)
- `BLOG_OUTPUT` – override the output path for the generated file

Logs are written to `logs/blog_generation.log`. To run the script automatically every day at noon, execute `scripts/install_blog_cron.sh` which installs a cron job writing output to `logs/cron.log`.

## Documentation

Refer to the documents in `docs/` for project guidelines:

- [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) – design and code conventions
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) – directory layout overview
- [docs/WORKFLOWS.md](docs/WORKFLOWS.md) – development process and troubleshooting
- [docs/RESPONSIVE_GUIDE.md](docs/RESPONSIVE_GUIDE.md) – breakpoints and testing notes

## Structure

Source files are organized under `src/` with feature modules in `src/modules/` and shared components in `src/components/`. Static assets live in `public/images`, `public/svgs`, and `public/excel`.
