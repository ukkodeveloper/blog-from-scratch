---
title: How Blog Posts Make it to Your Screen
date: 2024-05-03
tags:
  - nextJs
  - blog
image: /images/블로그%20글이%20화면에%20보이기까지-20241003131015152.webp
summary: An overview of the journey of a blog post (Markdown) from creation to display on a screen
published: true
---

Recently, I built a blog from scratch. One of the critical aspects of the blog development process was setting up my own CMS. To achieve this, I needed to have a clear understanding of how Markdown gets rendered on the web, so here’s a breakdown:

## 1. Writing Markdown: The Genesis of Your Content

It all starts with writing Markdown files. Developers usually use editors like Obsidian, VS Code, or Typora to write Markdown. At this stage, along with the body, it's important to include metadata in the form of YAML Front Matter.

```markdown
---
title: "The Merits of Markdown"
date: "2024-10-01"
tags: ["markdown", "git", "static site"]
---

# The Merits of Markdown

Markdown is a popular format among developers...
```

## 2. Markdown to JSON: Generating Structured Data

The next step is converting the Markdown files to JSON. ContentLayer plays a crucial role in this process.

### ContentLayer
1. Converts Front Matter to JSON properties
2. Converts the body to HTML and stores it in the 'content' field of JSON

Internally, ContentLayer uses tools like 'remark' and 'unified' to convert Markdown to HTML. It involves creating and transforming Abstract Syntax Tree (AST).

The result is a JSON file like:

```json
{
  "title": "The Merits of Markdown",
  "date": "2024-10-01",
  "tags": ["markdown", "git", "static site"],
  "content": "<h1>The Merits of Markdown</h1><p>Markdown is a popular format among developers...</p>"
}
```

## 3. Preparing for Static Site Generation (SSG) in Next.js

The data transformed into JSON is used by Next.js to generate static pages. The `getStaticProps` and `getStaticPaths` methods are crucial in this process.

```javascript
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}
```

## 4. Rendering in React Component

Since Next.js is React-based, the JSON data is rendered inside React components. The `dangerouslySetInnerHTML` method is used to safely render the HTML content.

```jsx
const Post = ({ post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};
```


## 5. Styling HTML with Tailwind CSS

The HTML transformed is styled using Tailwind CSS. Tailwind CSS’s `@tailwindcss/typography` plugin automatically applies styles to common HTML elements.

```jsx
import 'tailwindcss/tailwind.css';

const Post = ({ post }) => {
  return (
    <article className="prose prose-lg mx-auto">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};
```
Tailwind CSS uses a JIT (Just-In-Time) compiler to generate only the necessary styles.

## 6. Final Static HTML Generation and Deployment

Finally, Next.js compiles everything to generate static HTML files. These files are deployed globally via CDN, resulting in fast loading speeds.