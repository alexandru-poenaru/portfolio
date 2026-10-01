# Alexandru Poenaru's portfolio

Minimal, interactive React portfolio in Dutch and English. Dutch is the default; the language switch remembers the visitor's choice.

Run `npm start` for development, `npm test -- --watchAll=false` for checks, and `npm run build` for the production site.

Use Node.js 18 or newer. Development and production builds automatically obtain the Satoshi fonts directly from Fontshare on a fresh checkout, so the first run needs internet access. These proprietary binaries are ignored by Git because their license permits self-hosting on this website but prohibits redistribution through repositories. JetBrains Mono and its OFL license are included in the repo. See `src/assets/fonts/README.md` for sources and licensing details. Deploy with `npm run build` so the font preparation step runs.

The root `vercel.json` sets Vercel's build command to `npm run build` and its output directory to `build`, including font preparation in automatic Git deployments.

Website copy lives in `src/content/translations.js`. Original self-assessed skill scores live in `src/content/skills.js`. Skills reveal their level on hover, keyboard focus or tap. Category tabs support Left/Right, Home and End; Tab moves into the selected category.

SEO metadata for a fresh visit is included in `public/index.html`, with language-specific metadata updated by `LanguageContext`. Keep the default Dutch title and description consistent with the translations. The canonical domain is `https://www.alexandru-poenaru.com/`. Public assets include the round favicon, mobile icons, bilingual social preview cards, profile image, sitemap and robots.txt.

After deploying, submit the homepage for indexing and the sitemap in Google Search Console. Google chooses the final search title and snippet and may need time to recrawl. Changing the repo does not update the live Google result by itself.
