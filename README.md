# JOBIFY | MERN-Based Job Application Tracker

## Overview

**JOBIFY** is a powerful job application management system built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application provides a streamlined way to track job applications, featuring secure authentication, personalized tracking, and a user-friendly interface. With features like pagination, data visualization, and theme customization, Jobify offers a comprehensive solution for managing job hunts efficiently.

## Features

- **User Authentication & Authorization:** Secure login and personalized access.
- **Job Tracking:** Add, edit, and delete job applications easily.
- **Data Visualization:** Interactive bar and area charts for tracking application status and trends.
- **Pagination:** Efficiently navigate through large datasets.
- **Theme Customization:** Personalize your user interface with customizable themes.
- **Smart Caching:** Reduced database calls by up to 60%, resulting in faster tab switching (< 100ms for cached data).
- **Responsive Design:** Seamless experience across devices.

## Live Demo

Check out the live demo of the application [here]("https://jobify-chaitanyamands-projects.vercel.app/").

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

### 1. Clone the repository

Clone the repository and navigate to the project directory:

`git clone https://github.com/yourusername/jobify.git`
`cd jobify`

### 2. Set up the project

Run the setup script:

`npm run setup-project`

### 3. Configure environment variables

Create a `.env` file in the root directory. Use the following template and fill in your own values:

`NODE_ENV=development`
`PORT=5100`
`MONGO_URL=****`
`JWT_SECRET=****`
`JWT_EXPIRES_IN=1d`
`CLOUD_NAME=****`
`CLOUD_API_KEY=****`
`CLOUD_API_SECRET=****`
`EMAIL_VALIDATION_API_KEY=****`

### 4. Start the development server

Launch the application:

`npm run dev`

## Usage

- **Add Job:** Add a new job application with details like company, position, status, etc.
- **Edit Job:** Update job application information.
- **Delete Job:** Remove a job application from the tracker.
- **View Charts:** Analyze your job application trends using interactive charts.

## Technologies Used

- **Frontend:** React, CSS, Chart.js
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Hosting:** Vercel

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or feature requests.

## Acknowledgments

- Inspiration for the project came from the need to simplify job application management.
