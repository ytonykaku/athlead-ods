import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AddButton from '@/Components/AddButton';
import DietModal from '@/Components/DietModal';
import DataTableDiet from '@/Components/DataTableDiet';

export default function Diet() {
    const {user, diets } = usePage().props;

    console.log(user);
    console.log(diets);

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
            <Head title="Diets" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <span>Selecione sua dieta</span>
                    <DataTableDiet
                        label1={"Nome da dieta"}
                        label4={"Ações"}
                        data={diets}
                    />
                    <AddButton handleModal={openModal} />
                    <DietModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
