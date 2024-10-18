import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Avatar() {
    return (
        <div className="flex justify-center items-center">
            <img
                src="/storage/images/imagem8.jpg"
                alt="Avatar"
                className="w-16 h-16 rounded-full"
            />
        </div>
    );
}

