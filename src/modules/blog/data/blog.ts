
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
[
  {
    "title": "Best Samsung washing machines: AI tech innovations for your home",
    "summary": "These Samsung appliances combine style, smart technology and energy efficiency for the perfect blend of affordability and innovation",
    "image": "https://static.standard.co.uk/2025/05/22/9/14/samsung-main.jpeg?width=1200&auto=webp&quality=75",
    "date": "2025-06-08",
    "link": "https://www.standard.co.uk/shopping/esbest/home-garden/household-appliances/best-samsung-washing-machines-ai-tech-b1229186.html",
    "tags": [
      "Blog"
    ],
    "author": "Evening Standard",
    "authorRole": "Energy Analyst",
    "isEditorsPick": true,
    "slug": "best-samsung-washing-machines-ai-tech-innovations-for-your-home",
    "insight": "Avg. 12% CO₂ reduction"
  },
  {
    "title": "Suzlon Energy block deal: Promoters Tanti Family & Trust to offload 20 crore shares worth ₹1,295 crore",
    "summary": "Suzlon Energy block deal: The Suzlon Group's renewable energy major is expected to execute the block deal with its shares likely offered at a discount of up to three per cent to the current market price",
    "image": "https://www.livemint.com/lm-img/img/2025/06/07/1600x900/Over-the-past-two-decades--Suzlon-has-installed-ov_1680188225503_1749314117489.jpg",
    "date": "2025-06-07",
    "link": "https://www.livemint.com/market/stock-market-news/suzlon-energy-block-deal-promoters-tanti-family-trust-to-offload-20-crore-shares-worth-rs-1-295-crore-11749313721900.html",
    "tags": [
      "Case Study",
      "Smart Building"
    ],
    "author": "Livemint",
    "authorRole": "Senior Consultant",
    "isEditorsPick": false,
    "slug": "suzlon-energy-block-deal-promoters-tanti-family-trust-to-offload-20-crore-shares-worth-1-295-crore",
    "previewChart": [
      22,
      20,
      16,
      23,
      24,
      15
    ]
  },
  {
    "title": "Why Putting $7,000 in These Renewable Energy Stocks Makes Sense Now",
    "summary": "If you’re thinking long term, these two high-yield renewable energy stocks could turn that $7,000 into something much bigger.",
    "image": "https://www.fool.ca/wp-content/uploads/2022/05/GettyImages-607968618.jpg",
    "date": "2025-06-07",
    "link": "https://www.fool.ca/2025/06/06/why-putting-7000-in-these-renewable-energy-stocks-makes-sense-now/",
    "tags": [
      "Project Portfolio",
      "Energy"
    ],
    "author": "The Motley Fool Canada",
    "authorRole": "Project Engineer",
    "isEditorsPick": false,
    "slug": "why-putting-7-000-in-these-renewable-energy-stocks-makes-sense-now",
    "previewChart": [
      14,
      18,
      14,
      14,
      19,
      23,
      19
    ],
    "insight": "Avg. 16% CO₂ reduction"
  },
  {
    "title": "Praj Industries Partners with Enersur for Landmark Biorefinery Project in Paraguay",
    "summary": "Praj Industries teams up with Paraguay's Enersur S.A. for a significant Biorefinery Project to produce ethanol and other bio-based products, fostering renewable energy growth. This collaboration aligns with Paraguay's clean energy goals, enhancing rural development and reducing fossil fuel dependence, while symbolizing India's advanced technology and global partnerships.",
    "image": "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/aiimagegallery/06_06_2025_05_07_19_4951874.png?width=920&format=jpeg",
    "date": "2025-06-06",
    "link": "https://www.devdiscourse.com/article/headlines/3449315-praj-industries-partners-with-enersur-for-landmark-biorefinery-project-in-paraguay",
    "tags": [
      "Insights",
      "Sustainability"
    ],
    "author": "Devdiscourse",
    "authorRole": "Sustainability Lead",
    "isEditorsPick": false,
    "slug": "praj-industries-partners-with-enersur-for-landmark-biorefinery-project-in-paraguay",
    "insight": "Avg. 19% CO₂ reduction"
  },
  {
    "title": "Phantom Power: Hidden Drain On Power Bill",
    "summary": "Phantom power can account for 5 to 10 per cent of a household’s electricity costs: Bureau of Energy Efficiency (BEE)",
    "image": "https://images.deccanchronicle.com/dc-Cover-mvfvdkn1rvdqjbc8dl5tupl0d2-20180515025009.Medi.jpeg",
    "date": "2025-06-05",
    "link": "https://www.deccanchronicle.com/technology/phantom-power-hidden-drain-on-power-bill-1883626",
    "tags": [
      "Case Study",
      "Renewables"
    ],
    "author": "Deccan Chronicle",
    "authorRole": "R&D Director",
    "isEditorsPick": false,
    "slug": "phantom-power-hidden-drain-on-power-bill",
    "previewChart": [
      10,
      14,
      8,
      14,
      7,
      15
    ]
  },
  {
    "title": "Is Nuclear Energy the Future of AI-Powered Data Centres?",
    "summary": "Meta has stated that it prioritises efficient operations, ensuring that its electricity consumption matches 100% clean and renewable energy while actively exploring emerging technologies.",
    "image": "https://analyticsindiamag.com/wp-content/uploads/2024/04/Data-Centers-Shifts-to-Nuclear-Power-to-Meet-Rising-Energy-Demands.jpg",
    "date": "2025-06-05",
    "link": "https://analyticsindiamag.com/ai-features/is-nuclear-energy-the-future-of-ai-powered-data-centres/",
    "tags": [
      "Blog",
      "Efficiency"
    ],
    "author": "Analytics India Magazine",
    "authorRole": "Staff Writer",
    "isEditorsPick": true,
    "slug": "is-nuclear-energy-the-future-of-ai-powered-data-centres",
    "insight": "Avg. 20% CO₂ reduction"
  },
  {
    "title": "How Tamil Nadu’s green energy push in the Nilgiris undermines the Dravidian development model",
    "summary": "The state’s renewable energy policies are laudable but it must reconsider the risks – and price – of damming an over-dammed geography.",
    "image": "https://sc0.blr1.cdn.digitaloceanspaces.com/book/207593-vnzvhdtypr-1748610277.jpg",
    "date": "2025-06-05",
    "link": "https://scroll.in/article/1082999/how-tamil-nadus-green-energy-push-in-the-nilgiris-undermines-the-dravidian-development-model",
    "tags": [
      "Project Portfolio",
      "Technology"
    ],
    "author": "Scroll.in",
    "authorRole": "Industry Expert",
    "isEditorsPick": false,
    "slug": "how-tamil-nadu-s-green-energy-push-in-the-nilgiris-undermines-the-dravidian-development-model"
  },
  {
    "title": "California added record clean energy - can it keep it up?",
    "summary": "California is deploying renewable energy at a record-breaking pace, but it could get much harder to keep making progress.",
    "image": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/gettyimages-1558525665.jpg?quality=90&strip=all&crop=0%2C3.4135337268098%2C100%2C93.17293254638&w=1200",
    "date": "2025-06-04",
    "link": "https://www.theverge.com/climate-change/679615/renewable-energy-record-capacity-growth-california",
    "tags": [
      "Case Study",
      "AI"
    ],
    "author": "The Verge",
    "authorRole": "Technical Editor",
    "isEditorsPick": false,
    "slug": "california-added-record-clean-energy-can-it-keep-it-up",
    "previewChart": [
      17,
      10,
      18,
      14,
      11,
      11,
      15
    ]
  },
  {
    "title": "Singapore and the Philippines to expand collaboration in renewable energy, sustainability and healthcare",
    "summary": "PM Wong thanked President Marcos for his invitation to visit and said the bilateral relationship “has never been better”. Read more at straitstimes.com.",
    "image": "https://cassette.sphdigital.com.sg/image/straitstimes/441f4bd453580b887f1da3cef1b51316578cf3bf543c8b11418dd6f7d2ca96be",
    "date": "2025-06-04",
    "link": "https://www.straitstimes.com/singapore/politics/singapore-and-the-philippines-to-expand-collaboration-in-renewable-energy-sustainability-and",
    "tags": [
      "Insights",
      "Smart Grid"
    ],
    "author": "The Straits Times",
    "authorRole": "Energy Analyst",
    "isEditorsPick": false,
    "slug": "singapore-and-the-philippines-to-expand-collaboration-in-renewable-energy-sustainability-and-healthcare"
  },
  {
    "title": "Conservation Authority’s new headquarters leads by example",
    "summary": "The energy-efficient building sets the standard for sustainability and showcases an ideology, a purpose and an ethos",
    "image": "https://www.theglobeandmail.com/resizer/v2/NS7YKSU275FZLBPS6VEZ62DQ2U.JPG?auth=b97eb43e9bde89fc178bcc797bd2309a5302847a5e4d3660aadf4f549b3f77f4&width=1200&height=800&quality=80&smart=true",
    "date": "2025-06-04",
    "link": "https://www.theglobeandmail.com/real-estate/toronto/article-toronto-and-region-conservation-authority-shoreham-energy-efficient/",
    "tags": [
      "Blog",
      "Carbon"
    ],
    "author": "The Globe and Mail",
    "authorRole": "Senior Consultant",
    "isEditorsPick": false,
    "slug": "conservation-authority-s-new-headquarters-leads-by-example",
    "previewChart": [
      12,
      13,
      11,
      15,
      17
    ]
  }
,
  {
    "title": "Green building trends for 2025: what to expect",
    "summary": "Experts forecast wider adoption of net-zero technologies and smart materials driving sustainability in construction.",
    "image": "https://example.com/images/green-building.jpg",
    "date": "2025-06-01",
    "link": "https://example.com/green-building-trends-2025",
    "tags": ["Insights", "Trends"],
    "author": "CleanTech News",
    "authorRole": "Industry Expert",
    "isEditorsPick": false,
    "slug": "green-building-trends-for-2025-what-to-expect",
    "previewChart": [12, 17, 18, 15, 16],
    "insight": "Avg. 15% CO₂ reduction"
  },
  {
    "title": "AI helps optimize solar farm performance globally",
    "summary": "New AI-driven analytics platforms are improving maintenance and output across large-scale solar installations.",
    "image": "https://example.com/images/solar-ai.jpg",
    "date": "2025-06-03",
    "link": "https://example.com/ai-solar-optimization",
    "tags": ["Case Study", "AI"],
    "author": "SolarTech",
    "authorRole": "Project Engineer",
    "isEditorsPick": true,
    "slug": "ai-helps-optimize-solar-farm-performance-globally",
    "previewChart": [14, 15, 15, 17, 19, 20],
    "insight": "Avg. 18% CO₂ reduction"
  },
  {
    "title": "City announces major investment in electric buses",
    "summary": "The new fleet will reduce urban emissions while lowering operational costs over the next decade.",
    "image": "https://example.com/images/electric-bus.jpg",
    "date": "2025-06-04",
    "link": "https://example.com/city-investment-electric-buses",
    "tags": ["Project Portfolio", "Innovation"],
    "author": "Transit Weekly",
    "authorRole": "Staff Writer",
    "isEditorsPick": false,
    "slug": "city-announces-major-investment-in-electric-buses",
    "previewChart": [11, 13, 14, 16, 17],
    "insight": "Avg. 14% CO₂ reduction"
  },
  {
    "title": "How predictive maintenance saves energy in factories",
    "summary": "Sensors and real-time data allow manufacturers to cut downtime and waste, boosting overall efficiency.",
    "image": "https://example.com/images/predictive-maintenance.jpg",
    "date": "2025-06-05",
    "link": "https://example.com/predictive-maintenance-energy-savings",
    "tags": ["Blog", "Efficiency"],
    "author": "Industry Today",
    "authorRole": "Technical Editor",
    "isEditorsPick": false,
    "slug": "how-predictive-maintenance-saves-energy-in-factories",
    "previewChart": [10, 12, 11, 13, 15],
    "insight": "Avg. 13% CO₂ reduction"
  }
]
