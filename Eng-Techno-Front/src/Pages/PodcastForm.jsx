import React, { useState } from "react";
import { Link } from "react-router-dom";

const PodcastForm = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        console.log({ title, authors, date, duration, image, audio });
    };

    return (
        <>
            <Link
                to={"/"}
                className="absolute top-20 left-20 w-22 h-22 bg-[#8257E5] rounded-3xl flex items-center justify-center"
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

            <div className="bg-white rounded-3xl border-2 border-[#E6E8EB] p-6 max-w-2xl mx-auto mt-20">
                <h2 className="text-2xl font-semibold text-[#494D4B] mb-6">Criar Novo Podcast</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none focus:border-[#04D361]"
                            placeholder="Digite o título"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Autores</label>
                        <input
                            type="text"
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value)}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none focus:border-[#04D361]"
                            placeholder="Digite os autores"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Data</label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none focus:border-[#04D361]"
                            placeholder="Ex: 8 Jan 21"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Duração</label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none focus:border-[#04D361]"
                            placeholder="Ex: 1:35:18"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Imagem</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Áudio</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setAudio(e.target.files[0])}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white rounded-2xl w-32 h-12 flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 13l4 4L19 7"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Criar
                    </button>
                </form>
            </div>
        </>
    );
};

export default PodcastForm;
