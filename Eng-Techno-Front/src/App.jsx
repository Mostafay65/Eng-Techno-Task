import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from "react";
import Home from "./Pages/Home";
import "./App.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
