Satoshi by Indian Type Foundry, distributed through [Fontshare](https://www.fontshare.com/fonts/satoshi).

These WOFF2 files are the 400, 500, 700 and 900 faces previously served by the site's Fontshare stylesheet. They are hosted locally to avoid a blocking request to an external font stylesheet.

Satoshi uses the [ITF Free Font License v2.0](https://www.fontshare.com/licenses/itf-ffl), dated 17 August 2026. It permits personal and commercial website use and self-hosting, but prohibits redistributing the font software through repositories. The Satoshi binaries are therefore ignored by Git. `npm start` and `npm run build` download the unchanged official files directly from Fontshare when needed, with SHA-256 verification. Do not force-add these files to Git or redistribute the production font files as a font package or repository.

JetBrains Mono Regular v2.304 by JetBrains is used for code labels and metadata. The unmodified WOFF2 file comes from the [official JetBrains Mono repository](https://github.com/JetBrains/JetBrainsMono/tree/v2.304/fonts/webfonts). Its SIL Open Font License is included in `JetBrainsMono-OFL.txt`.

JetBrains Mono may be committed and redistributed with the project provided that its copyright notice and license are retained.
