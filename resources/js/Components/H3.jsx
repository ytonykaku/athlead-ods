import React from 'react';
import '../../css/H3.css';

const H3 = () => {
    return (
        <div className="container mx-auto h-[70vh] flex items-center justify-center relative">
            <div className="text-center z-10">
                <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Junte-se agora a nós!
                </h3>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
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
