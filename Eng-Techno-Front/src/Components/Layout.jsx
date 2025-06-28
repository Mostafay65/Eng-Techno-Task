import React from "react";
import { Outlet } from "react-router-dom";
import NaveBar from "./NaveBar";
import Player from "./Player";

export const Layout = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-6">
                <div className="col-span-1 lg:col-span-4">
                    <div className="fixed w-full lg:w-4/6 z-10">
                        <NaveBar />
                    </div>
                    <div className="pt-24 lg:pt-0">
                        <Outlet />
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 fixed bottom-0 lg:top-0 lg:right-0 h-20 lg:h-screen w-full lg:w-2/6 bg-[#8257E5] z-20">
                    <Player />
                </div>
            </div>
        </>
    );
};
