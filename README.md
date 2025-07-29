# KSShop Hub – Fashion E-Commerce (Frontend Only)

![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

KSShop Hub is a modern, responsive e-commerce web application for a clothing shop, built with React and Tailwind CSS. It features a seamless shopping experience, intuitive navigation, and a clean, professional design. **This repository now contains only the frontend (React) code. The previous backend code has been removed.**

---

## 🖼️ Screenshots

<p align="center">
  <img src="ksshop-ui/public/ks-logo.png" alt="KSShop Logo" width="100" />
</p>

<details>
<summary>Click to expand screenshots</summary>

| Home Page                                                           | Product Details                                                        | Cart Drawer                                                         | Mobile View                                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/placeholder/home.png) | ![](https://user-images.githubusercontent.com/placeholder/product.png) | ![](https://user-images.githubusercontent.com/placeholder/cart.png) | ![](https://user-images.githubusercontent.com/placeholder/mobile.png) |

</details>

---

## ✨ Features

- 🏠 **Home page** with featured products and carousel
- 🛍️ **Product details** with images, descriptions, and reviews
- 🛒 **Shopping cart** with add/remove/update functionality
- 🧾 **Drawer-based cart UI** for quick access
- 💳 **Checkout and order success** flow (demo, no real payment)
- 👤 **User authentication** (demo, with profile/avatar)
- ⭐ **Customer reviews/testimonials** section
- 🏆 **Top loyal customers** showcase
- 📄 **Informational pages:** About, Contact, Privacy Policy, Terms & Conditions
- 📱 **Fully responsive** for mobile, tablet, and desktop
- 🌙 **Modern UI/UX** with Tailwind CSS and custom components
- ⚡ **Fast, accessible, and SEO-friendly**

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [FormSubmit](https://formsubmit.co/) (for contact/review forms)
- [GitHub Pages](https://pages.github.com/) (for deployment)

## 🙋 FAQ

**Q: Is there a backend?**

A: No, this repo is frontend-only. All data is static or demo. You can connect to a backend or CMS if you wish.

**Q: Can I use this for my own shop?**

A: Yes! Fork, clone, and customize as you like. Replace demo data and branding.

**Q: How do I add products?**

A: Edit `src/data/products.json` in the `ksshop-ui` folder.

**Q: How do I deploy?**

A: See the Deploying section above. It's ready for GitHub Pages out of the box.

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the code style and keep PRs focused.

## 📁 Project Structure

```
ksshop-hub/
├── ksshop-ui/           # React frontend app
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ApuOrgho/ksshop-hub.git
   cd ksshop-hub/ksshop-ui
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm start
   # or
   yarn start
   ```
4. **View the app:**
   After starting the development server, open [http://localhost:3000](http://localhost:3000) in your browser if it does not open automatically.

## 📜 Scripts

- `npm start` — Start the development server
- `npm run build` — Build for production
- `npm test` — Run tests
- `npm run deploy` — Deploy to GitHub Pages

## 🌐 Live Demo

Access the deployed app here: [https://apuorgho.github.io/ksshop-hub](https://apuorgho.github.io/ksshop--hub)

## 🚀 Deploying to GitHub Pages

To deploy updates to GitHub Pages:

```sh
cd ksshop-ui
npm run deploy
```

This will build the app and publish the `build/` folder to the `gh-pages` branch. The backend is no longer included or required.

## 🎨 Customization

- Add or update products in the data source (`src/data/products.json`)
- Update branding and images in `public/assets/` (for static assets)
- Modify styles using Tailwind CSS classes

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

---

> **Developed by [Apu Das Orgho](https://github.com/ApuOrgho)**
