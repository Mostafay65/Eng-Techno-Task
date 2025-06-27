import React from "react";
import { Outlet } from "react-router-dom";
import NaveBar from "./NaveBar";
import Player from "./Player";

export const Layout = () => {
    return (
        <>
            <div className="grid grid-cols-6">
                <div className="col-span-4">
                    <div className="fixed w-4/6 z-1">
                        <NaveBar />
                    </div>
                    <Outlet />
                </div>
                <div className="col-span-2 fixed h-screen w-2/6 bg-[#8257E5] top-0 right-0">
                    <Player />
                </div>
            </div>
        </>
    );
};
