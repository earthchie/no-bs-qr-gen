# QR Code Generator

A professional React-based QR code generator with logo support, gradients, transparent backgrounds, and multiple input modes. Built with Vite + TypeScript + Tailwind CSS, ready for deployment on Cloudflare Pages.

## Features

### Input Modes
- **Text/URL**: Generate QR codes for any text or website URL
- **vCard**: Create contact cards with name, organization, phone, email, website, address
- **MeCard**: Alternative contact format with best-effort support
- **Wi-Fi**: Share Wi-Fi credentials with encryption support (WPA/WPA2/WEP/None)
- **Crypto Payments**: Generate payment URIs for Bitcoin, Ethereum (EIP-681), Lightning Network, and PromptPay

### Customization Options
- **Resolution**: 256px to 4096px (default 1000×1000)
- **Background**: Transparent by default, optional solid colors
- **Foreground Themes**: 5+ presets including gradients + custom color picker
- **Error Correction**: L / M / Q / H levels
- **Quiet Zone**: Adjustable margin (0-64px)
- **Dot Style**: Square, rounded, or dots
- **Logo Upload**: PNG/SVG with size control, background shapes, and white knockout

### Export & Actions
- Download as PNG or SVG at full resolution
- Copy image to clipboard (PNG)
- Copy encoded text to clipboard
- Real-time preview with checkerboard transparency indicator
- Contrast warning for low-contrast combinations

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Cloudflare Pages Deployment

### Quick Deploy
1. Push code to GitHub repository
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Deploy!

### Manual Configuration
If not using the Vite preset, use these settings:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)
- **Environment variables**: None required

## Usage Tips

### For Best Scanning Results
- **Contrast**: Use high contrast between foreground and background (avoid similar colors)
- **Quiet Zone**: Keep margin at 10-20px for reliable scanning
- **Error Correction**: Use Q or H for QR codes with logos
- **Logo Size**: Keep logos under 20% for optimal scannability

### Input Format Examples

**Bitcoin**:
```
bitcoin:bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4?amount=0.01
```

**Ethereum**:
```
ethereum:0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb6@1/transfer?value=1000000000000000
```

**Wi-Fi**:
```
WIFI:T:WPA2;S:MyNetwork;P:password123;H:false;;
```

**vCard**:
```
BEGIN:VCARD
VERSION:3.0
FN:John Doe
N:Doe;John;;;
ORG:ACME Corp
TEL:+1-555-1234
EMAIL:john@example.com
END:VCARD
```

## Tech Stack

- **React 19** - UI framework
- **Vite 6** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **qr-code-styling** - QR generation library
- **Lucide React** - Icons

## Browser Support

- Modern browsers with Clipboard API support for copy-to-clipboard features
- PNG and SVG export works in all modern browsers
- Logo upload supports PNG and SVG formats

## License

MIT

## Attributions

- QR code generation powered by [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- Icons by [Lucide](https://lucide.dev)
