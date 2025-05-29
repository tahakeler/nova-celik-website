import requests
import json

GNEWS_API_KEY = "9a90369dad37b3ad3f89ff92058472de"
NUM_POSTS = 19
OUTPUT_PATH = "./src/data/blog.ts"

TS_TYPE_DEF = """
export type BlogPost = {
  title: string;
  summary: string;
  image: string;
  date: string;
  link: string;
  tags: string[];
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

def fetch_energy_news():
    url = (
        f"https://gnews.io/api/v4/search?q=energy+efficiency+OR+sustainability+OR+renewable"
        f"&lang=en&max={NUM_POSTS}&token={GNEWS_API_KEY}"
    )
    r = requests.get(url)
    r.raise_for_status()
    return r.json().get("articles", [])

def make_dummy(idx):
    return {
        "title": f"Sample Post {idx+1}: NovaCelik Blog Demo",
        "summary": "This is a sample post generated for layout demonstration purposes.",
        "image": "/images/blog/default.jpg",
        "date": "2024-06-01",
        "link": "https://novacelik.com/sample-post",
        "tags": DUMMY_TAGS[idx % len(DUMMY_TAGS)],
    }

def main():
    articles = fetch_energy_news()
    posts = []
    # Use fetched news articles first
    for i, article in enumerate(articles):
        post = {
            "title": article['title'],
            "summary": article.get('description', ''),
            "image": article.get('image', '') or "/images/blog/default.jpg",
            "date": article.get('publishedAt', '')[:10],
            "link": article['url'],
            "tags": DUMMY_TAGS[i % len(DUMMY_TAGS)], # You can also parse real tags if you want
        }
        posts.append(post)
    # Fill to 19 with dummy data if needed
    for i in range(len(posts), NUM_POSTS):
        posts.append(make_dummy(i))
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(TS_TYPE_DEF)
        f.write(json.dumps(posts, indent=2, ensure_ascii=False))
        f.write(";")
    print("Saved TypeScript blog data to", OUTPUT_PATH)

if __name__ == "__main__":
    main()
