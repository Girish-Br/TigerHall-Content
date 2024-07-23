# Tigerhall Content

## Why you want to clone the project when you can acces me from here: https://girish-br.github.io/TigerHall-Content/

A single-page application for searching Tigerhall content.

## Technologies

- TypeScript
- React
- Chakra-UI

## Features
- Search Content: Search for Tigerhall content using a keyword filter.
- Loading Animation: Displays a loading animation during content fetch.
- Debounce: Implements a 300 ms debounce on the search input to optimize API calls.
- Infinite Scroll: Pagination with infinite scroll to load more content as the user scrolls down.
- Responsive Design: Ensures the application is usable on both desktop and mobile devices.
- Optimized Images: Resizes images fetched from the API for better performance.
- Custom Scrollbar: Stylish, thin, orange-colored scrollbar.
- Non-overlapping Card Content: Ensures card body content and icons do not overlap.
- Conditional Scrollbar Visibility: Main scrollbar is hidden initially and displayed only when scrolled to the bottom.

## Instructions
Clone the repository:
git clone <repository-url>
cd tigerhall-content
Install dependencies: npm install
Start the development server:npm start
Open your browser and navigate to http://localhost:3000 to see the application in action.

## Usage
- Search Content: Use the search box on the right side to filter content by keywords.
- Scroll to Load More: Scroll down to the bottom of the page to trigger infinite scroll and load more content.
- Responsive Design: The application layout adapts for smaller screens, aligning elements vertically.
## Components
- ContentList: Fetches and displays the list of content with search and infinite scroll functionality.
- ContentCard: Displays individual content items with details and actions.
- Loader: Shows a loading spinner during content fetch.
## Custom Hooks
- useDebounce: A custom hook to debounce the search input.
