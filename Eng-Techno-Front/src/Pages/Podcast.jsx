import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AudioContext } from "../Context/AudioContext";
import Loader from "../Components/Loader";
import ButtonLoader from "../Components/ButtonLoader";

const Podcast = () => {
    const { id } = useParams();
    const { selectedIndex, setSelectedIndex, podcasts, setPodcasts } = useContext(AudioContext);
    const [podcast, setPodcast] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const {} = useContext(AudioContext);
    const navigate = useNavigate();

    const getAudioDuration = (audioUrl) => {
        return new Promise((resolve) => {
            const audio = new Audio(audioUrl);
            audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration);
            });
            audio.addEventListener("error", () => {
                console.warn("Could not load audio metadata:", audioUrl);
                resolve(0); // fallback duration
            });
        });
    };

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const deletePodcast = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/podcasts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updatedPodcasts = podcasts.filter((_, index) => index !== selectedIndex);
                setPodcasts(updatedPodcasts);
                setSelectedIndex(-1);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting podcast:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/podcasts/${id}`);
                const data = await response.json();

                const durationInSeconds = await getAudioDuration(data.data.audio);

                setPodcast({
                    id: data.data._id,
                    title: data.data.title,
                    authors: data.data.author,
                    date: new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                    }).format(new Date(data.data.createdAt)),
                    duration: formatDuration(durationInSeconds),
                    imageSrc: data.data.image,
                    audioSrc: data.data.audio,
                    description: data.data.description,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching podcasts:", error);
            }
        };

        fetchPodcasts();
    }, [id]);

    return (
        <>
            {isloading ? (
                <Loader />
            ) : (
                <div className="mt-10 lg:mt-45 pb-20 lg:pb-0">
                    <div className="w-[90%] lg:w-[80%] h-48 lg:h-64 mx-auto rounded-2xl lg:rounded-3xl relative">
                        <Link
                            to={"/"}
                            className="absolute top-17 lg:top-20 -left-6 lg:-left-11 w-12 h-12 lg:w-22 lg:h-22 bg-[#8257E5] rounded-2xl lg:rounded-3xl flex items-center justify-center"
                        >
                            <svg
                                width="16"
                                height="20"
                                lg:w-20
                                lg:h-26
                                viewBox="0 0 10 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.33325 1.33329L1.66659 7.99996L8.33325 14.6666"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        <img src={podcast.imageSrc} className="w-full h-full object-cover rounded-2xl lg:rounded-3xl" />
                        <div className="absolute top-17 lg:top-20 -right-6 lg:-right-11 w-12 h-12 lg:w-22 lg:h-22 bg-[#04D361] rounded-2xl lg:rounded-3xl flex items-center justify-center">
                            <svg
                                width="16"
                                height="20"
                                lg:w-20
                                lg:h-26
                                viewBox="0 0 11 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.53687 0.978011C0.871149 0.554367 0 1.03258 0 1.82167V12.1783C0 12.9674 0.87115 13.4456 1.53688 13.022L9.67425 7.84366C10.2917 7.45071 10.2917 6.54929 9.67425 6.15634L1.53687 0.978011Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="w-[90%] lg:w-[80%] mx-auto mt-6 lg:mt-10 p-4 lg:p-5">
                        <div className="text-2xl lg:text-5xl font-sans text-[#494D4B] py-3 lg:py-5">{podcast.title}</div>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-[#808080] text-base lg:text-lg py-3 lg:py-5 lg:pr-5 gap-3 lg:gap-0">
                            <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                                <span>{podcast.authors}</span>
                                <span className="">•</span>
                                <span>{podcast.date}</span>
                                <span className="">•</span>
                                <span>{podcast.duration}</span>
                            </div>
                            <button
                                onClick={() => deletePodcast()}
                                disabled={isDeleting}
                                className="bg-red-500 p-2 lg:p-3 rounded-xl cursor-pointer hover:bg-red-400 hover:shadow-lg transition-all duration-300 w-fit"
                            >
                                {!isDeleting && (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4  text-red-500"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                  </svg>
                                )}
                                {isDeleting && <ButtonLoader />}
                            </button>
                        </div>
                        <hr className="w-full lg:w-[80%] mx-auto text-[#E6E8EB]" />
                        <div className="text-[#808080] text-base lg:text-lg py-3 lg:py-5">{podcast.description}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Podcast;
