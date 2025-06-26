import React from "react";
import imageSrc from "../assets/image.png";
import { Link } from "react-router-dom";
const AudioCard = () => {
    return (
        <Link to="/Podcast" className="bg-white rounded-3xl border-2 border-[#E6E8EB] p-4 flex ">
            <img src={imageSrc} alt="Post thumbnail" className="w-44 h-44 rounded-3xl object-cover" />
            <div className="w-full h-full px-5 flex flex-col justify-around">
                <h3 className="text-2xl font-semibold text-[#494D4B]">O que é um bom código?</h3>

                <div className="w-full flex justify-between">
                    <div className="text-lg">
                        <p className="text-[#808080]">Diego e Richard</p>
                        <p className="text-[#808080]">8 Jan 21 · 1:35:18</p>
                    </div>
                    <button className="bg-green-500 text-white rounded-full w-8 h-8  hover:bg-green-600">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill="white" stroke="#E6E8EB" />
                            <g clipPath="url(#clip0_1_230)">
                                <path d="M15.8333 12.7084V27.2917L27.2916 20L15.8333 12.7084Z" fill="#04D361" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_230">
                                    <rect x="7.5" y="7.5" width="25" height="25" rx="10" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default AudioCard;
