# Personal Portfolio

This is a modern, interactive personal portfolio website built using React with TypeScript and Tailwind CSS. The portfolio is designed to showcase the work and skills of Krish Kumar Sah, a software developer and IT student based in Cincinnati, Ohio.

## Features

- **Responsive Design**: The website is optimized for both desktop and mobile screens, ensuring a smooth user experience across devices.
- **Interactive Components**: Each section of the portfolio is built as a React component, allowing for modular and maintainable code.
- **Animations**: Utilizes Framer Motion for smooth UI transitions and animations, enhancing the visual appeal of the site.
- **Accessibility**: Follows best practices for accessibility to ensure that all users can navigate and interact with the portfolio.

## Project Structure

```
personal-portfolio
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React components for different sections
│   ├── assets              # Icon assets (Heroicons or Lucide)
│   ├── styles              # Global styles including Tailwind CSS
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point for the React application
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
├── postcss.config.js       # PostCSS configuration for Tailwind CSS
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration file
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the portfolio.

## Usage

The portfolio includes the following sections:

- **Hero Section**: Displays the name, title, location, and links to LinkedIn and GitHub.
- **About Me Section**: A brief bio about Krish Kumar Sah.
- **Projects Section**: Showcases various projects with descriptions and tech stacks.
- **Experience Section**: Lists work experience with bullet points.
- **Skills Section**: Displays programming languages, frameworks, and tools.
- **Contact Section**: A simple form for users to get in touch.

## License

This project is licensed under the MIT License. See the LICENSE file for details.