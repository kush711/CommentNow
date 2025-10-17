# Nested Commenting System (Frontend)

A **React frontend** implementation of a nested commenting system, designed to visually represent hierarchical comment threads for a single post. This project focuses on **UI and interaction**—allowing users to view comments, replies, and upvotes, as well as collapse and expand threads.  

Note: This project currently only implements the frontend. Backend functionality (storing or fetching comments) is not included.

---

## Problem Statement

Nested commenting systems are central to many interactive digital platforms, providing structured discussions, knowledge exchange, and community engagement. The goal of this project is to create a **fully functional commenting interface** that:

- Displays a single post (image, article, or placeholder text).
- Shows **top-level comments** directly under the post.
- Supports **replies to any comment**, forming multiple hierarchical levels.
- Allows **upvoting** to indicate popularity or relevance.
- Lets users **collapse or expand comment threads** for better readability.

---

## Features

- React-based frontend with modular components.
- Nested comments with unlimited levels of replies.
- **Upvote and Downvote functionality** for comments.
- **Sorting** by number of upvotes or newest.
- **Special admin user** privileges (like deleting comments).
- Collapse/expand threads for better navigation.
- Clean and intuitive UI using **Material-UI**.
- Animations and transitions using **Framer Motion**.
- UUID-based unique identifiers for comments and replies.
- includes a about me page.

---

## Tech Stack

This project uses the following technologies and libraries:

- **Frontend Framework:** React 19 
- **Build Tool / Bundler:** Vite  
- **UI Components:** Material-UI (MUI)  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  
- **Icons:** React Icons  
- **Utilities:** UUID (for unique identifiers), Day.js (for date/time handling)  

---

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository**  
   Use `git` to copy the project to your local machine:

   ```bash
   git clone https://github.com/kush711/CommentNow

2. **Install dependencies**  
   Install all required libraries and packages listed in `package.json`:

   ```bash
   npm install

---

### 4. Start the Development Server

Launch the app locally in development mode:

```bash
npm run dev

---

## Future Work

- Connect frontend to a **backend API** for storing comments, votes, and admin actions.
- Add **authentication** for users and admins.
- Implement **real-time updates** using WebSockets or Firebase.
- Enable **editing and deleting comments** for regular users.
- Improve **UI/UX**, mobile responsiveness, and accessibility.

---
