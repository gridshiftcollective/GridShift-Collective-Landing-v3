# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/60e31cba-27a6-4cfe-af75-257d35fbc3ef

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/60e31cba-27a6-4cfe-af75-257d35fbc3ef) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Content Guide

This project uses a content management system based on JSON files for team members and Markdown files for portfolio projects. This allows non-technical users to add and update content without touching code.

### Adding Team Members

1. Create a new JSON file in `src/content/team/` using the naming pattern: `<member-slug>.json`
2. Use the following template structure:

```json
{
  "id": "your-slug-here",
  "slug": "your-slug-here",
  "name": "Your Full Name",
  "role": "Your Job Title",
  "pronouns": "your/pronouns",
  "location": "City, Country",
  "bio": "Brief description of your expertise and passion.",
  "image": "/images/team/your-slug.jpg",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "tags": ["tag1", "tag2"],
  "links": {
    "website": "https://yourwebsite.com",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "availability": "open",
  "email": "your.email@example.com",
  "startDate": "2024-01-01",
  "draft": false,
  "hidden": false,
  "featuredOnHome": true,
  "homeWeight": 50,
  "order": 5,
  "seo": {
    "title": "Your Name — Job Title",
    "description": "Brief SEO description",
    "ogImage": "/images/team/your-slug-og.jpg"
  },
  "meta": {
    "updatedAt": "2024-01-01",
    "createdBy": "your-username"
  }
}
```

3. Place member photo in `public/images/team/<slug>.jpg`
4. Set `featuredOnHome: true` and adjust `homeWeight` (higher = more prominent) to appear on homepage
5. Set `draft: true` to hide during development or `hidden: true` to permanently exclude

### Adding Portfolio Projects

1. Create a new Markdown file in `src/content/portfolio/` using the naming pattern: `<yyyy-mm>-<project-slug>.md`
2. Use the following frontmatter template:

```markdown
---
id: "2024-01-your-project-slug"
slug: "your-project-slug"
title: "Your Project Title"
client: "Client Name"
category: "Web Development"
date: "2024-01-15"
startDate: "2024-01-01"
endDate: "2024-01-15"
status: "launched"
summary: "Brief project summary for previews."
technologies: ["React", "TypeScript", "Tailwind"]
tags: ["web-development", "react"]
authors: ["member-slug-1", "member-slug-2"]
image: "/images/portfolio/your-slug/cover.jpg"
gallery:
  - "/images/portfolio/your-slug/image1.jpg"
  - "/images/portfolio/your-slug/image2.png"
links:
  site: "https://project-site.com"
  repo: "https://github.com/org/repo"
  caseStudy: "https://example.com/case-study"
draft: false
hidden: false
featuredOnHome: true
homeWeight: 75
order: 10
seo:
  title: "Project Title — Case Study"
  description: "SEO description for the project"
  ogImage: "/images/portfolio/your-slug/og.jpg"
meta:
  updatedAt: "2024-01-15"
  createdBy: "your-username"
---

## Project Overview
Detailed project description and goals.

## Role & Responsibilities
- What you did
- Technologies used
- Challenges faced

## Highlights
- Key achievements
- Metrics/results

## Challenges & Solutions
- Problem: Description
- Solution: How you solved it

## Outcomes
- Results and impact

## Media
![Project Image](/images/portfolio/your-slug/image.jpg)
```

3. Place project images in `public/images/portfolio/<slug>/`
4. Set `featuredOnHome: true` and adjust `homeWeight` to appear on homepage
5. Reference team member slugs in the `authors` array
6. Use `order` field for custom sorting (higher = appears first)

### Content Management Rules

- **Slugs**: Use kebab-case (lowercase, hyphens) for all slugs
- **Images**: Store in `public/images/team/<slug>/` or `public/images/portfolio/<slug>/`
- **Dates**: Use YYYY-MM-DD format
- **Sorting**: Homepage previews use `homeWeight` desc, then `order` desc, then `date` desc
- **Visibility**: Set `draft: true` to exclude from builds, `hidden: true` for permanent exclusion
- **Required Fields**: `id`, `slug`, `name/title`, `image` are required for all content

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/60e31cba-27a6-4cfe-af75-257d35fbc3ef) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
# Test commit
