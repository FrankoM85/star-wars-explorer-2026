# Star Wars | Galaxy Explorer

**A personal React project exploring the Star Wars universe.**

Galaxy Explorer is a responsive web application built with React, JavaScript, Semantic UI, and the [Star Wars API](https://swapi.info/).

The project originally started as a school assignment focused on working with Semantic UI and external API data. In 2026, I decided to revisit the application and rebuild it with a more structured approach, a refreshed design, and an improved user experience.

My goal was to preserve the original learning experience while turning the project into a more complete and enjoyable application.

## Live Demo

**[Explore the Galaxy](https://frankom85.github.io/star-wars-explorer-2026/)**

## Preview

**Screenshots coming soon.**

## Features

### Explore the Galaxy

Browse six categories of Star Wars data:

- **Planets** — Explore worlds, climates, terrain, and population details.
- **People** — Discover characters and their characteristics.
- **Starships** — Browse spacecraft and their technical specifications.
- **Vehicles** — Explore vehicles from across the Star Wars universe.
- **Species** — Discover species and their unique attributes.
- **Films** — Explore movies, release information, and additional details.

### Search & Navigation

- Search records by name or title within each category.
- Browse results in structured tables on desktop.
- Navigate through results using pagination.
- Open detailed modal views for additional information.
- Explore related Star Wars records directly from their detail views.
- Navigate between characters, planets, films, starships, vehicles, and species through 19 supported relationship types.
- Follow nested relationships and return to previous views using Back navigation.

### User Experience

- Responsive layouts for desktop, tablet, and mobile.
- A dedicated mobile card list with vertical scrolling.
- A convenient back-to-top control on mobile.
- Loading, empty, and error states with retry functionality.
- Custom dark and gold Star Wars-inspired styling.
- Keyboard navigation, visible focus indicators, and accessible modal interactions.
- Consistent handling of missing, unknown, and meaningful API values.
- Smooth navigation between related records without unnecessary page reloads.

### API & Performance

- Shared API utilities keep data fetching separate from the interface.
- Category data is reused through a shared entity cache to reduce unnecessary requests.
- Previously loaded records can be opened without fetching the same data again.
- API requests include timeout handling and retry support for failed requests.
- Request cancellation and error handling help prevent outdated responses from affecting the interface.
- An optimized WebP background reduces asset size while preserving the original visual design.

## Tech Stack

- **React** — Component-based UI and state management
- **JavaScript** — Application logic and interactions
- **Vite** — Development environment and build tooling
- **Semantic UI React** — UI components and interface elements
- **CSS** — Responsive layouts, custom styling, and design tokens
- **Star Wars API** — Data for planets, people, starships, vehicles, species, and films
- **Oxlint** — Code quality checks
- **GitHub Actions & GitHub Pages** — Automated build and deployment

## What I Focused On

This project gave me an opportunity to revisit an earlier school assignment and apply what I have learned since then.

Rather than replacing Semantic UI, I wanted to explore how far I could take the original technology while building a more polished and maintainable application.

Some of the areas I focused on were:

- Organizing the application around reusable React components.
- Keeping API communication separate from presentation logic.
- Handling asynchronous requests, loading states, errors, and retry behavior.
- Creating a consistent interface across six different data categories.
- Designing different browsing experiences for desktop and mobile.
- Building reusable detail views and navigation between related records.
- Improving API efficiency through shared caching and request management.
- Improving keyboard accessibility and responsive behavior.
- Refining typography, colors, spacing, and small UI interactions.

One of the more interesting challenges was adapting the desktop table-based interface into a mobile-friendly card list without duplicating the underlying data and modal logic.

Another challenge was connecting the different types of Star Wars data. Characters, films, planets, and vehicles are closely related, and I wanted users to explore those connections naturally without constantly returning to the main category lists.

This also gave me an opportunity to improve how the application handles API requests, reuses downloaded data, and recovers from unexpected network errors.

The result is a project that reflects both my earlier learning experience and my current approach to frontend development.

## Getting Started

To run the project locally, you'll need Node.js and npm.

**1. Clone the repository**

```bash
git clone https://github.com/FrankoM85/star-wars-explorer-2026.git
cd star-wars-explorer-2026
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Open the local URL shown in your terminal.

To create a production build:

```bash
npm run build
```

To run the code quality check:

```bash
npm run lint
```

## Project Structure

```text
src/
├── api/                    # API requests and caching
├── assets/                 # Images and visual assets
├── components/
│   ├── films/
│   ├── people/
│   ├── planets/
│   ├── species/
│   ├── starships/
│   ├── vehicles/
│   ├── CategoryHeading.jsx
│   ├── CategoryTable.jsx
│   ├── CategoryModal.jsx
│   ├── MobileCategoryList.jsx
│   ├── HomeworldName.jsx
│   ├── RelatedEntityModal.jsx
│   ├── RelatedDetailFields.jsx
│   ├── categoryFormatting.js
│   └── relatedEntities.js
├── App.jsx
├── app.css
├── index.css
└── main.jsx
```

## API & Credits

Star Wars data is provided by the [Star Wars API](https://swapi.info/).

Star Wars and its associated characters, locations, vehicles, and other intellectual property belong to Lucasfilm and their respective rights holders.

This is an independent, non-commercial project created for learning and portfolio purposes.

---

**Built with curiosity, patience, and a passion for exploring new worlds.**
