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
            className="bg-white rounded-3xl border-2 border-[#E6E8EB] p-4 flex cursor-pointer"
        >
            <img src={podcast.imageSrc} alt="Post thumbnail" className="w-30 h-30 rounded-3xl object-cover" />
            <div className="w-full h-full px-5 flex flex-col justify-around">
                <h3 className="text-2xl lg:text-xl font-semibold text-[#494D4B]">{podcast.title.substr(0, 20)}....</h3>

                <div className="w-full flex justify-between">
                    <div className="text-lg">
                        <p className="text-[#808080]">{podcast.authors}</p>
                        <p className="text-[#808080]">
                            {podcast.date} · {podcast.duration}
                        </p>
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default AudioCard;
