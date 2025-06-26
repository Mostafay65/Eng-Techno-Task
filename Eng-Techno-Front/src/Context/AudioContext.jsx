import React, { createContext, useState } from "react";
import imageSrc from "../assets/image.png";
import audio from "../assets/audio.mp3"; 
import audio2 from "../assets/audio2.mp3"; 
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const staticPodcasts = [
        {
            imageSrc,
            audio,
            title: "A vida é boa",
            authors: "Tiago, Diego e Pellizzetti",
            date: "8 Jan 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio: audio2,
            title: "Como programar like a god",
            authors: "Maria, Tiago e Samuel",
            date: "7 Jan 21",
            duration: "35:40",
        },
        {
            imageSrc,
            audio,
            title: "Bora viver!",
            authors: "Diego e Richard",
            date: "12 Feb 21",
            duration: "54:27",
        },
        {
            imageSrc,
            audio: audio2,
            title: "Não desista de você",
            authors: "Pelpas, Pulii, Pepe e Pupa",
            date: "24 Mar 21",
            duration: "1:27:11",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio: audio2,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio: audio2,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
        {
            imageSrc,
            audio,
            title: "A vida é incrível",
            authors: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
        },
    ];

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [podcasts, setPodcasts] = useState(staticPodcasts);

    return (
        <AudioContext.Provider value={{ selectedIndex, setSelectedIndex, podcasts, setPodcasts }}>
            {children}
        </AudioContext.Provider>
    );
};
