import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../Components/ButtonLoader";
import { AudioContext } from "../Context/AudioContext";
import axios from "axios";

const PodcastForm = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [errors, setErrors] = useState("");
    const { podcasts, setPodcasts, fetchPodcasts } = useContext(AudioContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("author", authors);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("audio", audio);

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/podcasts`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                setTitle("");
                setAuthors("");
                setDescription("");
                setImage(null);
                setAudio(null);
                fetchPodcasts();

                navigate("/");
            } else {
                console.error("Error submitting form:", response);
            }
        } catch (error) {
            setErrors(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
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
                <h2 className="text-sm font-semibold text-red-500 mb-2">{errors}</h2>
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
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Descrição</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none focus:border-[#04D361]"
                            placeholder="Digite a descrição"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Imagem</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#494D4B] mb-2">Áudio</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setAudio(e.target.files[0])}
                            className="w-full p-3 border-2 border-[#E6E8EB] rounded-2xl text-[#808080] focus:outline-none cursor-pointer"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-500 text-white rounded-2xl w-32 h-12 flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                    >
                        {isSubmitting && <ButtonLoader />}
                        {!isSubmitting && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 13l4 4L19 7"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        <span className="pl-3">Criar</span>
                    </button>
                </form>
            </div>
        </>
    );
};

export default PodcastForm;
