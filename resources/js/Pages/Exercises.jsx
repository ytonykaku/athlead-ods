import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AddButton from '@/Components/AddButton';
import SheetModal from '@/Components/SheetModal';
import DataTable from '@/Components/DataTable';

export default function Exercises() {
    const { user, workoutSheets } = usePage().props;

    console.log(user);
    console.log(workoutSheets);

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
                    <span>Selecione sua ficha</span>
                    <DataTable
                        label1={"Nome da ficha de exercício"}
                        label4={"Ações"}
                        data={workoutSheets}
                    />
                    <AddButton handleModal={openModal} />
                    <SheetModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        
        </AuthenticatedLayout>
    );
}
