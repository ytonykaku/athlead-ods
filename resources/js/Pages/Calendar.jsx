import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from 'react-modal';

Modal.setAppElement('#app'); // ou o id principal do seu root HTML


export default function Calendar() {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    // Exemplo para gerar dias do mês (simplificado, ajuste conforme o mês)
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDayClick = (day) => {
      setSelectedDay(day);
      setIsModalOpen(true);
    };

    const handleMonthChange = (direction) => {
      setSelectedMonth((prevMonth) => (prevMonth + direction + 12) % 12);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Calendário
                </h2>
            }
        >
            <Head title="Calendar" />

    <div className="p-6">
      {/* Dropdown para selecionar o ano */}
      <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
        {[2022, 2023, 2024].map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
        <button
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{marginLeft: '20px' }}
        >
          Baixar: Report treinos
      
        </button>
      {/* Navegação por mês */}
      <div className="flex justify-between my-4">
        <button onClick={() => handleMonthChange(-1)}>←</button>
        <span>{new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })}</span>
        <button onClick={() => handleMonthChange(1)}>→</button>
      </div>

      {/* Grade de dias do mês */}
      <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day}
              className="flex items-center justify-center h-32 w-32 bg-gray-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          ))}
        </div>

      {/* Modal para registrar exercício */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Registro de exercício para o dia {selectedDay}</h2>
        <form>
          <label>Ficha de Exercício:</label>
          <input type="text" placeholder="Descreva sua ficha" />
          <button type="submit">Salvar</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Fechar</button>
      </Modal>
    </div>
        </AuthenticatedLayout>
    );
}
