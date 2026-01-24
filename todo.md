# Daily Todo - 23/01/26

## Reporting & Communication

- [x] Inform Simon about what was accomplished
- [ ] Share deployed Vercel live demo link
- [x] Share repository access/details
- [x] Create yesterday's summary of the work done.

    **Project Progress: From Zero to Current State**

    **Foundation & Initial Setup:**
    The project began with reading the specification and getting familiar with the requirements. Step by step, I learned about the general idea of it and now understand its core concepts. The initial project setup began by creating a full-stack Next.js-based application and pushing it to my personal GitHub profile. I wanted to create a full-stack app for better understanding of the process and web scraping, as it is a very interesting subject with many use cases. After the initial project setup, I focused on creating some logic and UI, and then improved navigation, including the addition of mobile menu functionality, dropdown navigation, and responsive design to enhance user experience and overall styling. Layout styling for main content and footer was added for better visual consistency. Technical improvements included adding and refactoring the Mongoose connection, simplifying CSS structure, and adding TypeScript declarations for CSS modules. Notably, the scraper and database integration was updated to utilize MongoDB with Mongoose, enhancing platform management and scraper functionality. The README was updated to reflect all changes, including project features, setup instructions, and usage examples. These enhancements contribute to a more user-friendly and efficient application. I've further refined the Navigation component with an improved label for the API section and enhanced styling for the dropdown and mobile menu. These changes directly impact the visual representation and user experience of the website, aiming to provide clearer navigation and a more visually appealing interface for users interacting with the API and navigating the site across both desktop and mobile devices.

    Repository is accessible via: <https://github.com/PawDevUK/ecommerce-scraper.git>

    Live demo will be available soon as I need to finish deployment to Vercel.

## Front-end Development Plan

- [ ] Enhance welcome page with platform overview and call-to-action
- [ ] Complete Navigation component styling and responsiveness
- [ ] Build authentication pages (Sign In/Sign Up) with form validation
- [ ] Create platform-specific pages (Amazon Business, Screwfix, RS Components, etc.)
- [ ] Implement invoice fetching UI with input forms and loading states
- [ ] Design results display for fetched invoices with proper formatting
- [ ] Add error handling and user feedback components
- [ ] Ensure mobile responsiveness across all pages
- [ ] Integrate API endpoints for backend communication
- [ ] Polish global styles and add consistent theming

# Daily Todo - 24/01/26

Dashbooard

I think dashborad need to be created of tailwind bento grid. It should have:

- Platforms supported count
- Platforms active/logged-in/connected  count
- Platforms inactive/logged-out/disconected. It will help tracking any problems.

- Invoices total downloaded
- Invoices due.
- Invoices paid
- Total of invoces paid
- Total of invoces to be paid

Platforms - after selected from the drop-down.

- Header
- Brief explanation of what can be found on this page
- Login or log out
- Status, if the service is active and all invoices are downoladed.
- List of all invoices
