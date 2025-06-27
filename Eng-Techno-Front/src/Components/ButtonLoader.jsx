import React from "react";
import { ClipLoader } from "react-spinners";

const ButtonLoader = () => {
    return (
        <div className="w-6 h-6 flex items-center justify-center">
            <ClipLoader color="#FFFFFF" size={20} />
        </div>
    );
};

export default ButtonLoader;
