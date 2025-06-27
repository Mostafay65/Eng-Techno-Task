import React, { useEffect, createContext, useState } from "react";
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const staticPodcasts = [];

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [podcasts, setPodcasts] = useState(staticPodcasts);
    const [isPodcastsLoading, setIsPodcastsLoading] = useState(true);

    const getAudioDuration = (audioUrl) => {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.src = audioUrl;
            audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration); // in seconds
            });
            audio.addEventListener("error", () => {
                console.error("Failed to load audio metadata:", audioUrl);
                resolve(0); // fallback
            });
        });
    };

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const fetchPodcasts = async () => {
        try {
            setIsPodcastsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/podcasts`);
            const data = await response.json();

            const podcastsWithDuration = await Promise.all(
                data.data.map(async (podcast) => {
                    const duration = await getAudioDuration(podcast.audio);
                    return {
                        id: podcast._id,
                        title: podcast.title,
                        authors: podcast.author,
                        date: new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                        }).format(new Date(podcast.createdAt)),
                        duration: formatDuration(duration),
                        imageSrc: podcast.image,
                        audioSrc: podcast.audio,
                        description: podcast.description,
                    };
                })
            );

            setPodcasts(podcastsWithDuration);
        } catch (error) {
            console.error("Error fetching podcasts:", error);
        } finally {
            setIsPodcastsLoading(false);
        }
    };

    useEffect(() => {
        fetchPodcasts();
    }, [setPodcasts]);

    return (
        <AudioContext.Provider
            value={{
                selectedIndex,
                setSelectedIndex,
                podcasts,
                setPodcasts,
                isPodcastsLoading,
                setIsPodcastsLoading,
                fetchPodcasts,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
