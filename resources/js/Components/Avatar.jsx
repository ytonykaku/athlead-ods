import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Avatar({avatarImage}) {
    return (
        <div className="flex justify-center items-center">
            <img
                src={avatarImage}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
            />
        </div>
    );
}

"/storage/images/imagem8.jpg"