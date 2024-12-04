import React, { useState } from 'react';
import AddButton from '@/Components/AddButton';
import DietModal from '@/Components/DietModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Diet() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dieta
                </h2>
            }
        >
            <Head title="Diet" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <AddButton handleModal={openModal} />

                    <DietModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
