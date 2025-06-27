import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Podcast from "./Pages/Podcast";
import PodcastForm from "./Pages/PodcastForm";
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
                    path: "/Podcast/:id",
                    element: <Podcast />,
                },
            ],
        },
        {
            path: "/Podcast/new",
            element: <PodcastForm />,
        },
    ]);
    return (
        <AudioProvider>
            <RouterProvider router={router} />
        </AudioProvider>
    );
}

export default App;
