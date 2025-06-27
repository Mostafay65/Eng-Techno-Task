import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="W-52 h-screen">
            <BounceLoader color="#8257E5" className="absolute top-1/2 left-1/2 w-15 h-15" />
        </div>
    );
};

export default Loader;
