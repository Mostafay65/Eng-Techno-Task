import React, { useEffect, createContext, useState } from "react";
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const staticPodcasts = [];

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [podcasts, setPodcasts] = useState(staticPodcasts);
    const [isPodcastsLoading, setIsPodcastsLoading] = useState(true);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setIsPodcastsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/podcasts`);
                const data = await response.json();
                console.log(data);
                setPodcasts(
                    data.data.map((podcast) => ({
                        id: podcast._id,
                        title: podcast.title,
                        authors: podcast.author,
                        date: new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                        }).format(new Date(podcast.createdAt)),
                        duration: "00:01",
                        imageSrc: podcast.image,
                        audioSrc: podcast.audio,
                        description: podcast.description,
                    }))
                );
            } catch (error) {
                console.error("Error fetching podcasts:", error);
            } finally {
                setIsPodcastsLoading(false);
            }
        };

        fetchPodcasts();
    }, [setPodcasts]);

    return (
        <AudioContext.Provider
            value={{ selectedIndex, setSelectedIndex, podcasts, setPodcasts, isPodcastsLoading, setIsPodcastsLoading }}
        >
            {children}
        </AudioContext.Provider>
    );
};
