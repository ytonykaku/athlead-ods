import React, { useState } from 'react';
import AddButton from '@/Components/AddButton';
import ExerciseModal from '@/Components/ExerciseModal';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Exercises() {
    const { props } = usePage();
    const workoutSheets = props?.workoutSheets || []

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Evita erro caso a propriedade não esteja definida
    //const { workoutSheets = [] } = usePage().props;
    console.log(props);

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
                    <ExerciseModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
