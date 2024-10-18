import React from 'react';
import '../../css/H2.css'; 

const H1 = () => {
    return (
        <div className="container mx-auto h-[70vh] flex flex-col lg:flex-row items-center justify-between relative">
            <div className="bg-image-container2 lg:w-1/2 h-full bg-cover bg-left relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-50"></div>
            </div>
            <div className="bg-white z-10 lg:w-1/2 max-w-lg lg:pl-8 p-4">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Os nossos benefícios:
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Saiba Mais
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default H1;
