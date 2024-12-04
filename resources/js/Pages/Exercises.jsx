import React, { useState } from 'react';
import AddButton from '@/Components/AddButton';
import ExerciseModal from '@/Components/ExerciseModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Exercises() {
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
                    Fichas de exercícios
                </h2>
            }
        >
            <Head title="Exercises" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <AddButton handleModal={openModal} />

                    <ExerciseModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
