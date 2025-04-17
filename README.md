# Headless WordPress + Next.js Example

This is an example project showing how to use WordPress as a headless CMS with Next.js.

## Setup

1. Clone this repo or download the ZIP.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root with your WordPress API URL:
   ```
   WP_API_URL=https://codivine.com.br//wp-json/wp/v2
   ```
4. Run in development:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- `src/api.js`: helper fetcher
- `src/app/layout.js`: global layout
- `src/app/page.js`: list posts
- `src/app/posts/[slug]/page.js`: dynamic post pages
