# 🎨 Modern Personal Portfolio Website

A stunning, responsive personal portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations, interactive UI elements, and dynamic content rendering.

## ✨ Features

### 🚀 Core Features
- **Hero Section**: Eye-catching animated intro with name, title, and call-to-action buttons
- **About Section**: Interactive cards with scroll-triggered animations for personal information
- **Projects Section**: Dynamic project loading with hover effects, animations, and modal details
- **Skills Section**: Animated skill progress bars and tech icons
- **Experience Timeline**: Animated timeline showing work and education history
- **Contact Section**: Functional contact form with validation and social links
- **Dark/Light Mode**: Smooth theme transitions with persistent storage
- **Responsive Design**: Fully responsive across all devices

### 🎯 Bonus Features
- **Blog Section**: Dynamic blog with search, filtering, and individual post pages
- **Route-based Animations**: Smooth page transitions using React Router
- **Advanced Animations**: Framer Motion for complex animations and interactions
- **Modern UI/UX**: Beautiful design with glass effects, gradients, and micro-interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 with JSX
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Routing**: React Router DOM
- **Intersection Observer**: React Intersection Observer
- **Data**: JSON files for dynamic content

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Projects.js
│   │   │   ├── Skills.js
│   │   │   ├── Experience.js
│   │   │   └── Contact.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Blog.js
│   │   └── BlogPost.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── data/
│   │   ├── projects.json
│   │   └── blog.json
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── App.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Hero Section** (`src/components/sections/Hero.js`)
   - Name, title, and description
   - Social media links

2. **About Section** (`src/components/sections/About.js`)
   - Personal story and statistics
   - Skills and expertise

3. **Projects** (`src/data/projects.json`)
   - Add your projects with images, descriptions, and links

4. **Skills** (`src/components/sections/Skills.js`)
   - Update skill categories and proficiency levels

5. **Experience** (`src/components/sections/Experience.js`)
   - Work history and education

6. **Contact** (`src/components/sections/Contact.js`)
   - Contact information and social links

7. **Blog Posts** (`src/data/blog.json`)
   - Add your blog posts with content and metadata

### Styling
- **Colors**: Modify the color palette in `tailwind.config.js`
- **Fonts**: Update font families in the Tailwind config
- **Animations**: Customize animations in the config file

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Or connect your GitHub repository

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🎭 Animations

### Framer Motion Features
- **Page Transitions**: Smooth route-based animations
- **Scroll Animations**: Elements animate when they come into view
- **Hover Effects**: Interactive elements with micro-animations
- **Stagger Animations**: Sequential element animations
- **Spring Physics**: Natural-feeling motion

### Custom CSS Animations
- **Gradient Animations**: Rotating background gradients
- **Floating Elements**: Subtle floating animations
- **Progress Bars**: Animated skill progress indicators

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended animations
- Custom utility classes
- Dark mode support

### Theme System
- Automatic dark/light mode detection
- Persistent theme preference
- Smooth theme transitions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## Backend for Contact Form

A simple Express backend is provided in `server.js` to handle contact form submissions.

### Setup & Run Backend

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on port 5000 by default.

### Connecting Frontend to Backend
- The frontend contact form sends POST requests to `/api/contact`.
- If running the backend on a different port (e.g., 5000) and the frontend on another (e.g., 3000), update the fetch URL in `src/components/sections/Contact.js` to `http://localhost:5000/api/contact` for local development.

### Customization
- The backend currently logs messages to the console. For production, integrate an email service (e.g., nodemailer) or a database as needed.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
