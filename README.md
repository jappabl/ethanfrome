# Ethan Frome - Zillow Parody Website

A Zillow-style real estate listing parody for the novel *Ethan Frome* by Edith Wharton. This project transforms the tragic tale into a darkly humorous property listing complete with all the bleakness of Starkfield winter.

## 🏠 Features

- ✅ **ETHAN FROME** as the largest text (meets spec requirement)
- ✅ Original spoof brand: "Starkfield Realty"
- ✅ Tagline: "Where dreams freeze and duty endures"
- ✅ Setting/characters: Starkfield winter, farmhouse, Ethan/Mattie/Zeena triangle
- ✅ Photo gallery with 8+ placeholder images (replace with your staged photos)
- ✅ Complete property sections: facts, description, agent notes, disclosures
- ✅ Neighborhood map (SVG)
- ✅ Comparable listings
- ✅ Dedicated 11×14 print flyer route
- ✅ Clean, professional UI with Tailwind CSS
- ✅ Fully responsive design
- ✅ GitHub Pages deployment ready

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build static site
npm run build

# Preview production build locally
npx serve@latest out
```

## 📸 Replacing Placeholder Images

**IMPORTANT**: The current images are SVG placeholders. Replace them with your actual staged photos:

1. Take or stage 6-12 original photos based on these prompts:
   - `hero-farmhouse.svg` → Isolated winter farmhouse exterior
   - `kitchen-table.svg` → Sparse kitchen with broken red pickle dish
   - `winter-window.svg` → Frosted window overlooking snow fields
   - `red-scarf.svg` → Red scarf draped on chair in dim light
   - `sled-hill.svg` → Steep hill with ominous tree at bottom
   - `comp-*.svg` → Additional farmhouse/building shots for comparable listings

2. Replace the `.svg` files in `/public/assets/` with your photos (`.jpg` or `.png`)
3. Update the file extensions in the code if needed

## 🖨️ Print Flyer (11×14)

Access the print-ready flyer at: [http://localhost:3000/print](http://localhost:3000/print)

The print page is optimized for 11×14 inch paper. Use your browser's print function:
- **Chrome/Edge**: Print → More Settings → Paper Size → Custom (11 x 14 inches)
- **Safari**: Print → Paper Size → Manage Custom Sizes → 11 x 14 inches

## 🌐 Deploying to GitHub Pages

### Setup (One-time)

1. Push this code to a GitHub repository named `ethanfrome`

2. Go to your repository settings:
   - Settings → Pages
   - Source: GitHub Actions

3. The workflow will automatically deploy on every push to `main`

4. Your site will be available at: `https://[username].github.io/ethanfrome/`

### Manual Deployment

```bash
# Build the static site
npm run build

# The 'out' folder contains your static files
# GitHub Actions will automatically deploy this
```

## 📁 Project Structure

```
ethanfrome/
├── app/
│   ├── page.tsx          # Main listing page
│   ├── print/
│   │   └── page.tsx      # 11×14 print flyer
│   └── globals.css       # Global styles
├── public/
│   └── assets/           # Replace these with your photos!
│       ├── hero-farmhouse.svg
│       ├── kitchen-table.svg
│       ├── winter-window.svg
│       ├── red-scarf.svg
│       ├── sled-hill.svg
│       └── comp-*.svg
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages deployment
└── next.config.ts        # Next.js config with static export
```

## ✅ Compliance Checklist

Before submitting:

- [x] **ETHAN FROME** is the largest text on the page
- [x] Tagline is clearly Frome-themed
- [x] Characters + Starkfield winter are visible
- [x] Parody brand is original (no copied logos)
- [ ] Replace placeholder SVGs with 6+ original staged photos
- [x] Tone is bleak, not meme-y
- [x] Print view works for 11×14
- [x] Educational disclaimer in footer

## 🎨 Customization

### Change the Repository Name

If your GitHub repo isn't named `ethanfrome`, update `next.config.ts`:

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
```

### Update Colors/Styles

All styling uses Tailwind CSS. Modify classes in the components directly.

## 🛠️ Tech Stack

- **Next.js 15** - React framework with static export
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **SVG** - Placeholder images and neighborhood map
- **GitHub Actions** - Automated deployment

## 📝 Educational Context

This is a student parody project inspired by Edith Wharton's *Ethan Frome* (1911). The website reimagines the novel's themes of entrapment, duty, and isolation through the lens of a modern real estate listing platform.

No actual properties are being sold. All content is fictional and created for educational purposes.

## 🤝 Credits

- Novel: *Ethan Frome* by Edith Wharton (1911)
- Inspired by: Zillow, Redfin, and modern real estate listing platforms
- Agent name "E. Wharton" is a tribute to the author

## 📄 License

This project is for educational use only. *Ethan Frome* is in the public domain.
