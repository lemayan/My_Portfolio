# How to Add a New Blog Post

## Easy Steps:

1. **Open the blog posts file**: `src/data/blogPosts.json`

2. **Copy this template** and add it to the array:

```json
{
  "id": 7,
  "title": "Your Blog Title Here",
  "excerpt": "A short description (2-3 sentences) that appears on the blog card.",
  "content": "Your full blog content here. This can be as long as you want!",
  "author": "Dennis Leleina",
  "date": "2026-02-06",
  "readTime": "5 min read",
  "category": "Web Development",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image": "/assets/projects/blog-image.png",
  "featured": false
}
```

3. **Fill in your details**:
   - **id**: Increment from the last post (e.g., if last is 6, use 7)
   - **title**: Your blog post title
   - **excerpt**: Short summary shown on the card (2-3 sentences)
   - **content**: Your full blog content
   - **date**: Format as YYYY-MM-DD
   - **readTime**: Estimate (e.g., "5 min read")
   - **category**: Choose from: "Web Development", "Blockchain", "Python", "TypeScript", "Cloud", or add new
   - **tags**: Array of relevant tags (3-5 recommended)
   - **featured**: Set to `true` to show "Featured" badge
   - **image**: Path to image (optional, can leave as placeholder)

4. **Example of adding a new post**:

```json
[
  {
    "id": 1,
    "title": "Existing post..."
  },
  {
    "id": 2,
    "title": "Another existing post..."
  },
  {
    "id": 7,
    "title": "My New Blog Post About React Hooks",
    "excerpt": "Deep dive into React Hooks and how they changed the way we write React components. Learn best practices and common patterns.",
    "content": "React Hooks revolutionized how we write React components...",
    "author": "Dennis Leleina",
    "date": "2026-02-06",
    "readTime": "8 min read",
    "category": "Web Development",
    "tags": ["React", "JavaScript", "Hooks", "Frontend"],
    "image": "/assets/projects/react-hooks.png",
    "featured": true
  }
]
```

## Important Notes:
- Don't forget the comma between posts!
- Keep the JSON format valid (use a JSON validator if needed)
- IDs should be unique and sequential
- Date format must be YYYY-MM-DD
- The blog will automatically update when you save the file

## Categories Available:
- Web Development
- Blockchain
- Python
- TypeScript
- Cloud
- (You can add new categories, they'll appear in the filter automatically!)

That's it! Your new blog post will appear immediately on your portfolio. 🎉
