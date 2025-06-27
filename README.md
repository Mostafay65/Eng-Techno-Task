# Eng-Techno-Task

This is a **Podcast App** created as a task for **ENG Techno Company**. The project is a monorepo containing both the frontend (React) and backend (Node.js/Express) applications.

---

## Table of Contents

-   [Project Structure](#project-structure)
-   [Live Demo](#live-demo)
-   [API Documentation](#api-documentation)
-   [Getting Started Locally](#getting-started-locally)
    -   [Backend Setup](#backend-setup)
    -   [Frontend Setup](#frontend-setup)
-   [Environment Variables](#environment-variables)

---

## Project Structure

```
Eng-Techno-Task/
  ├── Eng-Techno-Back/   # Backend (Node.js/Express)
  └── Eng-Techno-Front/  # Frontend (React/Vite)
```

---

## Live Demo

-   **Full App:** [https://eng-techno-task.vercel.app](https://eng-techno-task.vercel.app)
-   **Backend API:** [https://eng-techno-task.vercel.app/api](https://eng-techno-task.vercel.app/api)

---

## API Documentation

-   [API Docs (Apidog)](https://nm39g779sf.apidog.io)

---

## Getting Started Locally

### Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd Eng-Techno-Back
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in `Eng-Techno-Back/` with the following variables:
    ```env
    NODE_ENV=development
    PORT=4352
    CONNECTION_STRING=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
    ```bash
    cd Eng-Techno-Front
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in `Eng-Techno-Front/` with the following variable:
    ```env
    VITE_BASE_URL=http://localhost:4352/api
    ```
    (Or use the deployed API URL for production)
4. Start the frontend development server:
    ```bash
    npm run dev
    ```

---

## Environment Variables

### Backend (`Eng-Techno-Back/.env`)

-   `NODE_ENV=development`
-   `PORT=4352`
-   `CONNECTION_STRING=your_mongodb_connection_string`
-   `CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name`
-   `CLOUDINARY_API_KEY=your_cloudinary_api_key`
-   `CLOUDINARY_API_SECRET=your_cloudinary_api_secret`

### Frontend (`Eng-Techno-Front/.env`)

-   `VITE_BASE_URL=http://localhost:4352/api` (or your deployed API URL)

---

## Notes

-   The backend is available at `/api` on the deployed site.
-   For full API documentation and testing, visit [Apidog Docs](https://nm39g779sf.apidog.io).
