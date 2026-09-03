# SW Global Trade — Premium Static Export Website

A responsive, static B2B website for **SW Global Trade**, focused on Indian agricultural products and international trade.

## Pages
- Home
- About Us
- Products
- Quality & Export Process
- Gallery
- FAQ
- Contact / Request a Quote

## Technology
HTML5, CSS3 and Vanilla JavaScript. No backend, database, CMS or authentication.

## Run locally
Open `index.html` directly, or run a simple local server:

```bash
python -m http.server
```

Then open the displayed local address in your browser.

## Replace contact details
1. Open `js/main.js`.
2. Update `CONTACT_CONFIG.email`.
3. Update `CONTACT_CONFIG.whatsapp`.
4. Replace `[BUSINESS PHONE]` and `[BUSINESS ADDRESS]` in `contact.html` and `index.html`/footer as needed.
5. Replace the placeholder email if the actual business email differs.

## Replace images
Product and gallery visuals are stored under:
- `assets/images/hero/`
- `assets/images/products/`
- `assets/images/gallery/`

The included SVG visuals are lightweight local placeholders, so the site has no broken external image URLs. They can be replaced with optimized JPG/WebP/SVG photography while keeping the same filenames.

## Form
The form is static and does not pretend to have a backend. It validates the inquiry in the browser and prepares the same structured inquiry for:
- email (`mailto:`)
- WhatsApp

For production, replace the placeholder WhatsApp number and optionally connect the form to Formspree or another form endpoint.

## Deployment
### GitHub Pages
Upload the project to a repository and enable Pages for the desired branch/folder.

### Netlify
Drag the project folder into Netlify's static deployment flow or connect a Git repository.

### Vercel
Import the repository/project. No build command is required.

### cPanel
Upload the project files to the public web directory.

## SEO
Each page includes a unique title, description, canonical URL and Open Graph metadata. `robots.txt` and `sitemap.xml` are included.

## Business claim policy
The site intentionally avoids unsupported claims such as certifications, years of experience, export volume, customer counts, country lists, laboratory specifications and guarantees. Verify and add such facts only when they are actually available.

## Brand
**SW Global Trade**  
**Premium Indian Agriculture. Global Connections.**  
Domain: `swglobaltrade.in`
