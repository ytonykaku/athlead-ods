import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ workoutSheet }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detalhes da Ficha
                </h2>
            }
        >
            <Head title="Detalhes da Ficha" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">{workoutSheet.name}</h1>
                    <ul>
                        {workoutSheet.exercises.map((exercise) => (
                            <li key={exercise.id} className="mb-2">
                                <strong>{exercise.name}</strong>: {exercise.sets} séries, {exercise.repetitions} repetições
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}