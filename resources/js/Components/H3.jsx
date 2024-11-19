import React from 'react';
import '../../css/hero.css'; 
import '../../css/global.css'; 
import '../../css/H3.css';

const H3 = () => {
    return (
        <div className="container mx-auto h-[70vh] flex items-center justify-center relative">
            <div className="text-center z-10">
                <h3 className="title dark:text-white">
                    Junte-se agora a nós!
                </h3>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="bg-image-container3 absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-100"></div>
            </div>
        </div>
    );
};

export default H3;
