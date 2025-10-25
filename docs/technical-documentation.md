Technical Documentation – Portfolio Website
🧩 Project Overview

This portfolio website serves as a personal showcase of skills, projects, and contact information.
It is built using HTML, CSS (Flexbox/Grid), and JavaScript, and is designed to be responsive, clean, and easy to navigate.

📁 File Structure
portfolio/
├── index.html                # Main HTML file
├── css/
│   └── styles.css            # Stylesheet
├── js/
│   └── script.js             # JavaScript for interactivity
├── docs/
│   ├── ai-usage-report.md    # Details AI tools, benefits, challenges, and learning outcomes
│   └── technical-documentation.md # Technical details, structure, and implementation overview
└── README.md                 # Project description and overview

🏗 Architecture

HTML Structure: Defines layout sections including header, about, projects, and contact form.

CSS Organization: Uses modular organization with sections for layout, typography, and responsive design.

JavaScript Modules: Handles interactivity, animations, API integration, and theme toggle functionality.

🧱 HTML Structure

Header: Contains website title and navigation menu.

About Me Section: Brief introduction, tagline, and optional profile image.

Education Section: Displays the degree and relevant courses.

Skills Section: Displays computer skills.

Projects Section: Displays project cards with title, description, and image.

Acheviments Section: Display acheviments with their description with dates.

Extracurricular Section: Displays the extracurricular activities and their description.

Contact Section: Includes fields for Name, Email, and Message.

Footer: Contains copyright or external links.

🎨 CSS Structure

Layout: Built using Flexbox and CSS Grid for a responsive layout.

Typography: Uses consistent font families, weights, and spacing for readability.

Colors & Themes: Supports light and dark modes using CSS variables.

Responsive Design: Media queries ensure adaptability across desktop, tablet, and mobile devices.

⚙️ JavaScript Functionality
Key Functions
setupThemeToggle()

Purpose: Manages switching between dark and light modes.


fetchGitHubStats()

Purpose: Fetches user data from the GitHub API to display repository statistics.


validateForm()

Purpose: Checks that all fields in the contact form are properly filled before submission.


toggleProjectDetails()

Purpose: Expands or collapses project details dynamically when clicked.


🌐 API References

GitHub API: https://api.github.com/users/arway26

Used to fetch GitHub profile information and project data dynamically.

🧰 Development Tools

Code Editor: Visual Studio Code (recommended)

Version Control: Git and GitHub for repository management

AI Assistance: ChatGPT (GPT-5 Mini) and Claude AI were responsibly used for drafting content, refining ideas, and coding suggestions.

🚀 Deployment

Open index.html in any modern web browser.

Optionally, run a local web server for testing:

python -m http.server