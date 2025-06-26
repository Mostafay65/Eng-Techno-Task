import React from "react";
import podcastImg from "../assets/podcast.png";
import { Link } from "react-router-dom";

const Podcast = () => {
    return (
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
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </Link>
                <img src={podcastImg} className="w-full h-full object-cover rounded-3xl" />
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
                <div className="text-5xl font-sans text-[#494D4B] py-5">Como começar na programação em 2021 do jeito certo</div>
                <div className="flex items-center gap-5 text-[#808080] text-lg py-5">
                    <span>Diego e Richard</span> • <span>8 Jan 21</span> • <span>35:40</span>
                </div>
                <hr className="w-[80%] mx-auto text-[#E6E8EB]" />
                <div className="text-[#808080] text-lg py-5">
                    Nesse episódio do Faladev, Diego Fernandes se reúne com João Pedro Schmitz, Bruno Lemos e Diego Haz, para
                    discutir sobre a importância da contribuição open source e quais desafios circulam na comunidade. A gente
                    passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana
                    reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação. O Faladev
                    é um podcast original Rocketseat.
                </div>
            </div>
        </div>
    );
};

export default Podcast;
