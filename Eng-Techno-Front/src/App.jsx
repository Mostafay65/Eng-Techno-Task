import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Podcast from "./Pages/Podcast";
import "./App.css";
import { Layout } from "./Components/Layout";
import { AudioProvider } from "./Context/AudioContext";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/Podcast",
                    element: <Podcast />,
                },
            ],
        },
    ]);
    return (
        <AudioProvider>
            <RouterProvider router={router} />
        </AudioProvider>
    );
}

export default App;
