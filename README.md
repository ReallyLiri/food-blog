# Food Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/08df62c0-5e83-4e75-9134-cba1bd6c082f/deploy-status)](https://app.netlify.com/sites/thyme-and-again/deploys)

Visit at [https://thyme-and-again.netlify.app](https://thyme-and-again.netlify.app)

## Development

```bash
yarn
yarn dev
```

After changing posts, make sure to run `yarn build` or `yarn search-meta:gen`.

## Editing the Blog

Edit or create `mdx` files at [data/blog](data/blog). The dir structure is only for your convenience.

Each blog post must be prefixed with the following:

```ini
---
title: Required! Some title
authors: ["zero or more"]
tags: ["zero or more"]
categories: ["one! or more"]
date: "your-date-at-now"
---
... then your actual contents!
```
