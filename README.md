# AI Career Compass

A modern AI Job Discovery Dashboard built with React.

## Features

- Search Jobs
- Save Jobs
- Trending Skills
- Job Details
- Responsive Design
- Dark Mode
- Redux Toolkit
- Context API
- React Router
- Axios
- Tailwind CSS

## Folder Structure

```text
career-compass/
├── public/
│   └── .gitkeep
├── src/
│   ├── assets/
│   │   └── .gitkeep
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx
│   │   ├── SearchBar/
│   │   │   └── SearchBar.jsx
│   │   ├── JobCard/
│   │   │   └── JobCard.jsx
│   │   ├── SavedJobCard/
│   │   │   └── SavedJobCard.jsx
│   │   ├── FilterPanel/
│   │   │   └── FilterPanel.jsx
│   │   ├── Loader/
│   │   │   └── Loader.jsx
│   │   ├── Pagination/
│   │   │   └── Pagination.jsx
│   │   ├── SkillBadge/
│   │   │   └── SkillBadge.jsx
│   │   └── Footer/
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Jobs/
│   │   │   └── Jobs.jsx
│   │   ├── JobDetails/
│   │   │   └── JobDetails.jsx
│   │   ├── SavedJobs/
│   │   │   └── SavedJobs.jsx
│   │   ├── TrendingSkills/
│   │   │   └── TrendingSkills.jsx
│   │   ├── Profile/
│   │   │   └── Profile.jsx
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── jobs/
│   │   │   ├── jobSlice.js
│   │   │   └── jobThunk.js
│   │   └── saved/
│   │       └── savedSlice.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── services/
│   │   └── jobsApi.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Tech Stack

- React 19 (Vite)
- React Router DOM
- Redux Toolkit
- React Redux
- Context API
- Axios
- Tailwind CSS
- React Icons
- Framer Motion
- ESLint
- Prettier
- Vercel

## Installation

```bash
git clone <your-repository-url>
cd career-compass
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deploy using Vercel.

## Learning Objectives

This project demonstrates:

- React Components
- JSX
- Props
- State
- Event Handling
- Conditional Rendering
- React Router
- Context API
- Redux Toolkit
- createSlice
- createAsyncThunk
- Axios
- Custom Hooks
- Responsive Design

## Future Improvements

- Authentication
- AI Resume Matching
- Resume Upload
- Backend Integration
- Notifications
- Infinite Scrolling

## License

MIT
