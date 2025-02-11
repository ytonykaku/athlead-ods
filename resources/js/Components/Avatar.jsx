import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Avatar({avatarImage}) {
    return (
        <div className="flex justify-center items-center">
            <img
                src={avatarImage}
                alt="Avatar"
                className="w-64 h-64 mb-3 rounded-[46px] object-cover"
            />
        </div>
    );
}

"/storage/images/imagem8.jpg"