import React, { useState, useRef, useEffect, useContext } from "react";
import audioFile from "../assets/audio.mp3";
import { AudioContext } from "../Context/AudioContext";

const Player = () => {
    const { selectedIndex, setSelectedIndex } = useContext(AudioContext);
    const { podcasts } = useContext(AudioContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);

    const [currentMinute, setCurrentMinute] = useState("00");
    const [currentSecond, setCurrentSecond] = useState("00");

    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    useEffect(() => {
        if (selectedIndex !== -1 && podcasts[selectedIndex]) {
            audioRef.current = new Audio(podcasts[selectedIndex].audio);

            audioRef.current.onended = () => {
                setProgress(0);
                setIsPlaying(false);
                setSelectedIndex((selectedIndex + 1) % podcasts.length);
            };

            audioRef.current.ontimeupdate = () => {
                if (audioRef.current) {
                    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                    setCurrentMinute(
                        Math.floor(audioRef.current.currentTime / 60)
                            .toString()
                            .padStart(2, "0")
                    );
                    setCurrentSecond(
                        Math.floor(audioRef.current.currentTime % 60)
                            .toString()
                            .padStart(2, "0")
                    );
                }
            };

            audioRef.current.onloadedmetadata = () => {
                if (audioRef.current) {
                    setMinutes(
                        Math.floor(audioRef.current.duration / 60)
                            .toString()
                            .padStart(2, "0")
                    );
                    setSeconds(
                        Math.floor(audioRef.current.duration % 60)
                            .toString()
                            .padStart(2, "0")
                    );
                }
            };

            audioRef.current.oncanplay = () => {
                playAudio();
            };
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            setIsPlaying(false);
            setProgress(0);
            setCurrentMinute("00");
            setCurrentSecond("00");
            setMinutes("00");
            setSeconds("00");
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.onended = null;
                audioRef.current.ontimeupdate = null;
                audioRef.current.onloadedmetadata = null;
                audioRef.current.oncanplay = null;
            }
        };
    }, [selectedIndex, setSelectedIndex, podcasts]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                if (selectedIndex !== -1) {
                    if (isPlaying) {
                        pauseAudio();
                    } else {
                        playAudio();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [selectedIndex, isPlaying]); 

    const playAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pauseAudio = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <div className="bg-[#8257E5] h-screen flex flex-col items-center justify-between text-white p-4">
            <div className="flex items-center mt-4">
                <span className="text-sm mr-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.7081 19.0346H19.6241C19.3268 19.0346 19.0548 19.2026 18.9228 19.468L17.9214 21.4706C17.7774 21.76 17.3641 21.76 17.2201 21.4706L14.7708 16.5706C14.6281 16.2866 14.2254 16.28 14.0748 16.56L12.9601 18.6226C12.8228 18.876 12.5574 19.0346 12.2694 19.0346H11.2921"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.55874 16H5.33474C3.62541 16 2.35741 17.5866 2.73341 19.2533L3.63608 23.2533C3.91074 24.4693 4.99074 25.3333 6.23741 25.3333H7.83208C8.26008 25.3333 8.57608 24.9373 8.48274 24.52L6.76008 16.892C5.42274 10.968 9.92674 5.33331 16.0001 5.33331V5.33331V5.33331C22.0734 5.33331 26.5774 10.968 25.2401 16.892L23.5187 24.52C23.4241 24.9373 23.7414 25.3333 24.1681 25.3333H25.7627C27.0094 25.3333 28.0894 24.4693 28.3641 23.2533L29.2667 19.2533C29.6427 17.5866 28.3747 16 26.6654 16H25.4414"
                            stroke="#04D361"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span className="text-sm">Tocando agora</span>
            </div>
            <div>
                <div className="flex items-center justify-center">
                    {selectedIndex == -1 && (
                        <div className="bg-[#9164FACC] rounded-2xl p-8 flex items-center justify-center border-2 border-dashed border-[#9F75FF] h-96 w-96">
                            <p className="text-center max-w-[80%] text-2xl font-bold">Selecione um podcast para ouvir</p>
                        </div>
                    )}
                    {selectedIndex !== -1 && (
                        <img
                            src={podcasts[selectedIndex].imageSrc}
                            alt="Podcast Cover"
                            className="border-2 border-dashed border-[#9F75FF] h-96 w-96 rounded-2xl object-cover"
                        />
                    )}
                </div>
                {selectedIndex !== -1 && (
                    <div className="text-center mt-10">
                        <h1 className="font-bold text-3xl">{podcasts[selectedIndex].title}</h1>
                        <p className="text-lg text-[#C1ABF2]">{podcasts[selectedIndex].authors}</p>
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col items-center mb-6">
                <div className="w-[80%] mx-auto flex items-center justify-between text-xs mb-2">
                    <span className={selectedIndex == -1 ? "text-[#C1ABF2]" : "text-white"}>
                        {selectedIndex !== -1 ? `${currentMinute}:${currentSecond}` : "00:00"}
                    </span>
                    <div className="w-full bg-[#9F75FF] h-1 rounded-full mx-5 relative">
                        <div
                            className="h-1 bg-[#04D361] rounded-full  transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        ></div>
                        {progress != 0 && (
                            <div
                                className="absolute bg-white w-5 h-5 border-5 border-[#04D361] rounded-full  transition-all duration-200"
                                style={{ left: `${progress - 4}%`, top: "-7px" }}
                            ></div>
                        )}
                    </div>
                    <span className={selectedIndex == -1 ? "text-[#C1ABF2]" : "text-white"}>
                        {selectedIndex !== -1 ? `${minutes}:${seconds}` : "00:00"}
                    </span>
                </div>

                <div className="flex space-x-4 mt-4">
                    <button className="hover:bg-[#9164FA] px-4 rounded-2xl transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 17.9793L5.384 17.9913C6.393 17.9963 7.336 17.4943 7.896 16.6553L14.105 7.34126C14.663 6.50326 15.605 6.00226 16.612 6.00526L21 6.02126"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19 19.9792L21 17.9792L19 15.9792"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.893 8.62522L7.904 7.25322C7.337 6.46722 6.425 6.00322 5.455 6.00822L3 6.02122"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.969 15.3752L14.095 16.8312C14.665 17.5682 15.546 17.9982 16.478 17.9952L21 17.9792"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19 8.02124L21 6.02124L19 4.02124"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        disabled={selectedIndex === -1}
                        onClick={() => setSelectedIndex((selectedIndex - 1 + podcasts.length) % podcasts.length)}
                        className="hover:bg-[#9164FA] px-4 rounded-2xl transition-colors duration-200"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_204)">
                                <path
                                    d="M17.4759 19.0623C18.1422 19.4724 19 18.993 19 18.2107L19 5.78981C19 5.00749 18.1422 4.52814 17.4759 4.93815L6 12.0002L17.4759 19.0623Z"
                                    fill="white"
                                />
                                <rect
                                    x="7"
                                    y="20.0002"
                                    width="2"
                                    height="16"
                                    rx="1"
                                    transform="rotate(180 7 20.0002)"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_204">
                                    <rect width="24" height="24" fill="white" transform="translate(24 24) rotate(180)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    {!isPlaying && (
                        <button
                            disabled={selectedIndex === -1}
                            onClick={playAudio}
                            className="bg-[#9164FA] rounded-2xl w-15 h-15 flex items-center justify-center"
                        >
                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.2035 0.644638C1.53778 0.220995 0.666626 0.699209 0.666626 1.4883V16.5116C0.666626 17.3007 1.53778 17.7789 2.2035 17.3553L14.0075 9.84362C14.625 9.45067 14.625 8.54925 14.0075 8.1563L2.2035 0.644638Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    )}
                    {isPlaying && (
                        <button
                            onClick={pauseAudio}
                            className="bg-[#6F48C9] rounded-2xl w-15 h-15 flex items-center justify-center"
                        >
                            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.5 0C2.32843 0 3 0.671573 3 1.5V17.5C3 18.3284 2.32843 19 1.5 19C0.671573 19 0 18.3284 0 17.5V1.5C0 0.671573 0.671573 0 1.5 0ZM9.5 0C10.3284 0 11 0.671573 11 1.5V17.5C11 18.3284 10.3284 19 9.5 19C8.67157 19 8 18.3284 8 17.5V1.5C8 0.671573 8.67157 0 9.5 0Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={() => setSelectedIndex((selectedIndex + 1) % podcasts.length)}
                        className="hover:bg-[#9164FA] px-4 rounded-2xl transition-colors duration-200"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_199)">
                                <path
                                    d="M6.5241 4.93815C5.85783 4.52814 5 5.00749 5 5.78981V18.2107C5 18.993 5.85783 19.4724 6.5241 19.0623L16.6161 12.8519C17.2506 12.4614 17.2506 11.5391 16.6161 11.1486L6.5241 4.93815Z"
                                    fill="white"
                                />
                                <rect x="17" y="4.00024" width="2" height="16" rx="1" fill="#FFFFFF" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_199">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <button className="hover:bg-[#9164FA] px-4 rounded-2xl transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 4.00024L16 6.00524L8.849 5.98424C5.632 5.98424 3 8.62324 3 11.8482V11.8482C3 13.4612 3.658 14.9272 4.718 15.9892"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 20.0002L8 17.9952L15.151 18.0162C18.368 18.0162 21 15.3772 21 12.1522V12.1522C21 10.5392 20.342 9.07323 19.282 8.01123"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Player;
