This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

How This Project Is Done
1. Post Page Implementation
The post page is built using React.
It includes fields for a title, content, and an optional image, styled to resemble a social media post.
Users can input and preview their post content directly on the page.
2. OG Image Generation
A serverless function is used to dynamically generate the og:image.
This function utilizes Puppeteer to render the post content as an image with dimensions 1200x630 pixels.
Canvas is used for drawing text and images onto the generated image, ensuring the design is visually appealing.
3. Integration
The OG image URL is generated by the serverless function and dynamically added to the HTML meta tags of the post page.
Next.js is used to handle server-side rendering and API routes for generating the OG image.
4. Styling
The og:image is styled with a gradient background, title, and content in a visually appealing manner.
Branding elements such as colors and fonts are applied to match the post's design.
5. Performance Optimization
The image generation process is optimized for speed by leveraging Puppeteer for fast rendering and caching strategies to minimize server load.





