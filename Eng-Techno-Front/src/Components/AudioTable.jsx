import React, { useEffect, useContext } from "react";
import imageSrc from "../assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { AudioContext } from "../Context/AudioContext";

const PodcastItem = ({ imageSrc, title, authors, date, duration }) => {
    return (
        <div className="flex items-center space-x-4 p-2 hover:bg-gray-100">
            <img src={imageSrc} alt={title} className="w-15 h-15 rounded" />
            <div className="flex">
                <h4 className="text-sm font-medium text-[#808080]">{title}</h4>
                <p className="text-xs text-[#808080]">{authors}</p>
            </div>
            <p className="text-xs text-[#808080]">{date}</p>
            <p className="text-xs text-[#808080]">{duration}</p>
            <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </button>
        </div>
    );
};

const AudioTable = () => {
    const navigate = useNavigate();
    const { selectedIndex, setSelectedIndex, podcasts } = useContext(AudioContext);

    return (
        <table className="w-full rounded-lg">
            <thead>
                <tr className="text-sm font-semibold text-start text-[#AFB2B1]">
                    <td className="flex-1 p-2">PODCAST</td>
                    <td className="w-1/4 p-2">INTEGRANTES</td>
                    <td className="w-1/6 p-2">DATA</td>
                    <td className="w-1/6 p-2">DURAÇÃO</td>
                </tr>
            </thead>
            <tbody>
                {podcasts.map((podcast, index) => (
                    <tr
                        key={index}
                        className="border-b border-[#E6E8EB] hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                        onClick={() => {
                            setSelectedIndex(index);
                            navigate(`/Podcast/${podcast.id}`);
                        }}
                    >
                        <td className="p-2 flex gap-5 items-center text-lg font-medium text-[#494D4B]">
                            <div className="w-15 h-15 rounded">
                                <img src={podcast.imageSrc} alt={podcast.title} className="w-15 h-15 rounded-xl object-cover" />
                            </div>
                            <h1>{podcast.title.substr(0, 20)}....</h1>
                        </td>
                        <td className="p-2 text-sm text-[#808080]">{podcast.authors}</td>
                        <td className="p-2 text-sm text-[#808080]">{podcast.date}</td>
                        <td className="p-2 text-sm text-[#808080]">{podcast.duration}</td>
                        <td className="p-2">
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedIndex(index);
                                }}
                                className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                            >
                                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#F7F8FA" stroke="#E6E8EB" />
                                    <g clipPath="url(#clip0_83_240)">
                                        {selectedIndex !== index && (
                                            <path d="M12.6666 10.1666V21.8333L21.8333 16L12.6666 10.1666Z" fill="#04D361" />
                                        )}

                                        {selectedIndex === index && (
                                            <>
                                                <rect x="11" y="10" width="3" height="12" rx="0.5" fill="#04D361" />
                                                <rect x="18" y="10" width="3" height="12" rx="0.5" fill="#04D361" />
                                            </>
                                        )}
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_83_240">
                                            <rect width="20" height="20" fill="white" transform="translate(6 6)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AudioTable;
