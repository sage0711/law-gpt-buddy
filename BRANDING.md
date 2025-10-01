# Branding Guide

## Logo & Favicon

### Current Logo

The application uses a custom-designed logo featuring:

- **Scale of Justice** - Representing legal expertise
- **Canadian Maple Leaf** - Representing Canadian jurisdiction
- **Blue Gradient** - Professional and trustworthy color scheme (#4F88FF to #1E40AF)

### Files

- `public/logo.svg` - Main SVG logo (512x512)
- `public/favicon.ico` - Browser favicon
- `public/og-image.png` - Social media preview image (recommended: 1200x630px)

### Updating the Logo

#### Option 1: Using the SVG Logo

The current SVG logo is located at `public/logo.svg`. You can:

1. Edit it directly in the file
2. Replace it with your own design
3. Use a design tool like Figma or Adobe Illustrator

#### Option 2: Generate Favicons from Logo

To create professional favicons from your logo:

1. **Using RealFaviconGenerator** (Recommended)

   - Go to https://realfavicongenerator.net/
   - Upload your `logo.svg` or a PNG version
   - Download the generated favicon package
   - Replace files in the `public/` directory

2. **Using Favicon.io**

   - Go to https://favicon.io/
   - Upload your logo
   - Download the package
   - Replace `favicon.ico`

3. **Manual Creation**
   ```bash
   # If you have ImageMagick installed
   convert logo.svg -resize 32x32 public/favicon.ico
   ```

### Social Media Images

#### Open Graph Image (og-image.png)

Create a 1200x630px image with:

- Your logo
- Application name
- Tagline: "AI-Powered Canadian Personal Injury Law Assistant"
- Professional background

**Recommended tools:**

- Canva (template: Facebook Post)
- Figma
- Adobe Photoshop

### Color Scheme

The application uses the following color palette:

#### Primary Colors

- **Primary Blue**: `#4F88FF` (HSL: 217 91% 60%)
- **Dark Blue**: `#1E40AF` (HSL: 224 76% 48%)
- **Accent**: Same as Primary Blue

#### Usage

- **Primary**: Buttons, links, highlights, logo
- **Dark Blue**: Gradients, hover states
- **White**: Text on primary colors

#### Light Mode

- Background: `#F8F9FB` (HSL: 210 17% 98%)
- Card: `#FFFFFF`
- Text: `#1E3A5F` (HSL: 217 33% 17%)

#### Dark Mode

- Background: `#0A1628` (HSL: 217 33% 10%)
- Card: `#142238` (HSL: 217 33% 13%)
- Text: `#F8F9FB` (HSL: 210 17% 98%)

### Typography

- **Font Family**: System fonts for optimal performance
  - `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Headings**: Bold weight (700)
- **Body**: Regular weight (400)
- **Small Text**: 0.875rem
- **Base Text**: 1rem
- **Headings**: 1.5rem - 2.5rem

### Icon

The Scale icon (from lucide-react) is used throughout:

```tsx
import { Scale } from "lucide-react";
```

### Branding Elements

#### Header

- Logo/icon with gradient background
- Application name: "PI Law Assistant"
- Subtitle: "Canadian Personal Injury Law Expert"

#### Welcome Screen

- Large centered logo
- Gradient text title
- Professional description

### Customization

To customize the branding for your firm:

1. **Update the logo**

   - Replace `public/logo.svg` with your firm's logo
   - Update `public/favicon.ico`

2. **Update colors**

   - Modify color values in `src/index.css`
   - Update gradient values

3. **Update text**

   - Firm name in `src/pages/Index.tsx` (header)
   - Welcome message in `src/components/WelcomeScreen.tsx`
   - Meta tags in `index.html`

4. **Update legal disclaimer**
   - Modify `src/components/Footer.tsx`
   - Add your firm's contact information

### Brand Voice

When customizing text content, maintain:

- **Professional** yet **approachable** tone
- **Clear** and **concise** language
- **Empathetic** when discussing injuries
- **Educational** about legal processes
- **Transparent** about limitations (not a substitute for real legal advice)

### Examples

#### Firm-Specific Customization

```tsx
// In src/pages/Index.tsx
<h1 className="text-lg font-semibold text-card-foreground">
  [Your Firm Name] Legal AI
</h1>
<p className="text-xs text-muted-foreground">
  Personal Injury Law Specialist
</p>
```

#### Custom Footer

```tsx
// In src/components/Footer.tsx
<p className="leading-relaxed">
  <strong>Legal Disclaimer:</strong> [Your firm's disclaimer] Contact: [Your
  contact info]
</p>
```

---

For questions about branding, please refer to the main README.md or contact your development team.
