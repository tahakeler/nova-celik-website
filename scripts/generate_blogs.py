import requests
import json
import random
import re

GNEWS_API_KEY = "9a90369dad37b3ad3f89ff92058472de"

QUERY = "energy efficiency OR sustainability OR renewable"
LANG = "en"
NUM_POSTS = 30
OUTPUT_PATH = "./src/modules/blog/data/blog.ts"

TS_TYPE_DEF = """
export type BlogPost = {
  title: string;
  summary: string;
  image: string;
  date: string;
  link: string;
  tags: string[];
  author: string;
  authorRole: string;
  previewChart?: number[];
  isEditorsPick?: boolean;
  insight?: string;
  slug: string;
};

export const blogPosts: BlogPost[] =
"""

DUMMY_TAGS = [
    ["Blog"],
    ["Case Study", "Smart Building"],
    ["Project Portfolio", "Energy"],
    ["Insights", "Sustainability"],
    ["Case Study", "Renewables"],
    ["Blog", "Efficiency"],
    ["Project Portfolio", "Technology"],
    ["Case Study", "AI"],
    ["Insights", "Smart Grid"],
    ["Blog", "Carbon"],
    ["Insights", "Cost Saving"],
    ["Blog", "Future"],
    ["Case Study", "Industry"],
    ["Insights", "Trends"],
    ["Project Portfolio", "Success"],
    ["Blog", "Sustainability"],
    ["Case Study", "Best Practice"],
    ["Blog", "Update"],
    ["Project Portfolio", "Innovation"],
]
ROLES = [
    "Energy Analyst",
    "Senior Consultant",
    "Project Engineer",
    "Sustainability Lead",
    "R&D Director",
    "Staff Writer",
    "Industry Expert",
    "Technical Editor",
]

def slugify(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def random_chart(length=6):
    base = random.randint(10, 18)
    return [base + random.randint(-3, 6) for _ in range(length)]

def fetch_energy_news():
    url = (
        f"https://gnews.io/api/v4/search?q={QUERY}"
        f"&lang={LANG}&max={NUM_POSTS}&token={GNEWS_API_KEY}"
    )
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return r.json().get("articles", [])
    except requests.RequestException as exc:
        print(f"Warning: failed to fetch news - {exc}")
        return []

def build_blog_post(article, i):
    tags = DUMMY_TAGS[i % len(DUMMY_TAGS)]
    author = article.get('author')
    if not author:
        source = article.get('source')
        if isinstance(source, dict):
            author = source.get('name', '').strip()
    if not author:
        author = "NovaCelik Team"
    author_role = ROLES[i % len(ROLES)]
    is_editors_pick = i % 5 == 0
    has_insight = "Sustainability" in tags or random.random() < 0.3
    insight = "Avg. {}% CO₂ reduction".format(random.randint(10, 20)) if has_insight else None
    preview_chart = random_chart(random.randint(5, 7)) if "Case Study" in tags or random.random() < 0.5 else None
    title = article['title']
    slug = slugify(title)
    post = {
        "title": title,
        "summary": article.get('description', ''),
        "image": article.get('image', '') or "/images/blog/default.jpg",
        "date": article.get('publishedAt', '')[:10],
        "link": article['url'],
        "tags": tags,
        "author": author,
        "authorRole": author_role,
        "isEditorsPick": is_editors_pick,
        "slug": slug,
    }
    if preview_chart is not None:
        post["previewChart"] = preview_chart
    if insight is not None:
        post["insight"] = insight
    return post

def main():
    articles = fetch_energy_news()
    posts = [build_blog_post(article, i) for i, article in enumerate(articles)]
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(TS_TYPE_DEF)
        f.write(json.dumps(posts, indent=2, ensure_ascii=False))
        f.write(";")
    print(f"Saved {len(posts)} real blog posts to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
