import React, { useContext } from "react";
import { AudioContext } from "../Context/AudioContext";

import { Link } from "react-router-dom";
const AudioCard = ({ podcast, index }) => {
    const { selectedIndex, setSelectedIndex } = useContext(AudioContext);

    return (
        <div
            onClick={() => {
                setSelectedIndex(index);
            }}
            className="bg-white rounded-3xl border-2 border-[#E6E8EB] p-3 lg:p-4 flex cursor-pointer"
        >
            <img
                src={podcast.imageSrc}
                alt="Post thumbnail"
                className="w-20 h-20 lg:w-30 lg:h-30 rounded-2xl lg:rounded-3xl object-cover flex-shrink-0"
            />
            <div className="w-full h-full px-3 lg:px-5 flex flex-col justify-around">
                <h3 className="text-lg lg:text-xl font-semibold text-[#494D4B] line-clamp-2">{podcast.title}</h3>

                <div className="w-full flex justify-between items-end">
                    <div className="text-sm lg:text-lg">
                        <p className="text-[#808080] line-clamp-1">{podcast.authors}</p>
                        <p className="text-[#808080] text-xs lg:text-base">
                            {podcast.date} · {podcast.duration}
                        </p>
                    </div>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedIndex(index);
                        }}
                        className="rounded-full cursor-pointer w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-green-600 transition-colors duration-200 flex-shrink-0"
                    >
                        <svg
                            width="32"
                            height="32"
                            lg:w-40
                            lg:h-40
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
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
                </div>
            </div>
        </div>
    );
};

export default AudioCard;
