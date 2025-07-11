import React, { useContext } from "react";
import NaveBar from "../Components/NaveBar";
import AudioCard from "../Components/AudioCard";
import AudioTable from "../Components/AudioTable";
import { Link } from "react-router-dom";
import { AudioContext } from "../Context/AudioContext";
import Loader from "../Components/Loader";

const scgIcon = (
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
);
const Home = () => {
    const { podcasts, isPodcastsLoading } = useContext(AudioContext);
    return (
        <>
            {isPodcastsLoading ? (
                <Loader />
            ) : (
                <div className="pb-20 lg:pb-0">
                    <div className="container mx-auto p-4 lg:p-15 mt-4 lg:mt-25">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-10 gap-4">
                            <h1 className="text-2xl lg:text-3xl font-bold text-[#494D4B]">Últimos lançamentos</h1>
                            <Link
                                to={"/Podcast/new"}
                                className="bg-[#04D361] rounded-2xl py-3 px-6 text-white font-sans cursor-pointer flex items-center gap-2 hover:bg-[#04D361]/90 transition-colors w-fit"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    lg:w-32
                                    lg:h-32
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.7081 19.0346H19.6241C19.3268 19.0346 19.0548 19.2026 18.9228 19.468L17.9214 21.4706C17.7774 21.76 17.3641 21.76 17.2201 21.4706L14.7708 16.5706C14.6281 16.2866 14.2254 16.28 14.0748 16.56L12.9601 18.6226C12.8228 18.876 12.5574 19.0346 12.2694 19.0346H11.2921"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.55874 16H5.33474C3.62541 16 2.35741 17.5866 2.73341 19.2533L3.63608 23.2533C3.91074 24.4693 4.99074 25.3333 6.23741 25.3333H7.83208C8.26008 25.3333 8.57608 24.9373 8.48274 24.52L6.76008 16.892C5.42274 10.968 9.92674 5.33331 16.0001 5.33331V5.33331V5.33331C22.0734 5.33331 26.5774 10.968 25.2401 16.892L23.5187 24.52C23.4241 24.9373 23.7414 25.3333 24.1681 25.3333H25.7627C27.0094 25.3333 28.0894 24.4693 28.3641 23.2533L29.2667 19.2533C29.6427 17.5866 28.3747 16 26.6654 16H25.4414"
                                        stroke="#8257E5"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>{" "}
                                create new
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                            <AudioCard podcast={podcasts[podcasts.length - 1]} index={podcasts.length - 1} />
                            <AudioCard podcast={podcasts[podcasts.length - 2]} index={podcasts.length - 2} />
                        </div>
                    </div>
                    <div className="container mx-auto p-4 lg:p-15">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-[#494D4B]">Todos os episódios</h1>
                        <AudioTable />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
