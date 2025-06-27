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
                console.log(data);
                setPodcast({
                    id: data.data._id,
                    title: data.data.title,
                    authors: data.data.author,
                    date: new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                    }).format(new Date(data.data.createdAt)),
                    duration: "00:01",
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
                <div className="mt-45 ">
                    <div className="w-[80%] h-64 mx-auto rounded-3xl  relative">
                        <Link
                            to={"/"}
                            className="absolute top-20 -left-11 w-22 h-22 bg-[#8257E5] rounded-3xl flex items-center justify-center"
                        >
                            <svg width="20" height="26" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.33325 1.33329L1.66659 7.99996L8.33325 14.6666"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        <img src={podcast.imageSrc} className="w-full h-full object-cover rounded-3xl" />
                        <div className="absolute top-20 -right-11 w-22 h-22 bg-[#04D361] rounded-3xl flex items-center justify-center">
                            <svg width="20" height="26" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.53687 0.978011C0.871149 0.554367 0 1.03258 0 1.82167V12.1783C0 12.9674 0.87115 13.4456 1.53688 13.022L9.67425 7.84366C10.2917 7.45071 10.2917 6.54929 9.67425 6.15634L1.53687 0.978011Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="w-[80%] mx-auto mt-10 p-5">
                        <div className="text-5xl font-sans text-[#494D4B] py-5">{podcast.title}</div>
                        <div className="flex items-center justify-between text-[#808080] text-lg py-5 pr-5">
                            <div className="flex items-center gap-4">
                                <span>{podcast.authors}</span> • <span>{podcast.date}</span> • <span>{podcast.duration}</span>
                            </div>
                            <button
                                onClick={() => deletePodcast()}
                                disabled={isDeleting}
                                className="bg-red-500 p-3 rounded-xl cursor-pointer hover:bg-red-400 hover:shadow-lg transition-all duration-300 "
                            >
                                {!isDeleting && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-trash"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                )}
                                {isDeleting && <ButtonLoader />}
                            </button>
                        </div>
                        <hr className="w-[80%] mx-auto text-[#E6E8EB]" />
                        <div className="text-[#808080] text-lg py-5">{podcast.description}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Podcast;
