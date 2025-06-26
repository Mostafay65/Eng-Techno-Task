import React from "react";
import NaveBar from "../Components/NaveBar";
import AudioCard from "../Components/AudioCard";
import AudioTable from "../Components/AudioTable";

const Home = () => {
    return (
        <div>
            <div className="container mx-auto p-15 mt-25">
                <h1 className="text-3xl font-bold mb-4 text-[#494D4B]">Últimos lançamentos</h1>
                <div className="grid  lg:grid-cols-2  gap-10">
                    <AudioCard />
                    <AudioCard />
                </div>
            </div>
            <div className="container mx-auto p-15">
                <h1 className="text-3xl font-bold mb-4 text-[#494D4B]">Todos os episódios</h1>
                <AudioTable />
            </div>
        </div>
    );
};

export default Home;
