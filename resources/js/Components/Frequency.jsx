import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const Footer = ({ laravelVersion, phpVersion }) => {
    return (
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col items-center pb-10">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Total de check-ins</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">#</span>
                </div>
            </div>
    );
};

export default Footer;