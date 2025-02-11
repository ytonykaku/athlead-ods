import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Modal from 'react-modal';
import DataTable from '@/Components/DataTable';
import DataTableDiet from '@/Components/DataTableDiet';
import RelatorioModal from '@/Components/RelatorioModal';

Modal.setAppElement('#app'); // ou o id principal do seu root HTML


export default function Calendar() {
  const { user, workoutSheets, diets } = usePage().props;

  // console.log(user);
  //console.log(workoutSheets);
  //console.log(diets);
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  
  const [selectedSheet, setSelectedSheet] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  
  const [calendarEntries, setCalendarEntries] = useState([]);
  
  // Exemplo para gerar dias do mês (simplificado, ajuste conforme o mês)
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRelatorioModalOpen, setIsRelatorioModalOpen] = useState(false);
  
  const openRelatorioModal = () => {
    setIsRelatorioModalOpen(true);
  };

  const closeRelatorioModal = () => {
    setIsRelatorioModalOpen(false);
  };

  useEffect(() => {
    axios.post('/calendar/getEntries', {
      year: selectedYear,
      month: selectedMonth + 1
    }).then(response => {
      setCalendarEntries(response.data.entries);
    });
  }, [selectedYear, selectedMonth]);
  

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleMonthChange = (direction) => {
    setSelectedMonth((prevMonth) => (prevMonth + direction + 12) % 12);
  };

  const handleSaveEntry = () => {
    const requestData = {
      user_id: user.id,
      date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
      workout_sheet_id: selectedSheet ? Number(selectedSheet) : null,
      diet_id: selectedDiet ? Number(selectedDiet) : null
    };
  
    console.log("Enviando request:", requestData);
  
    axios.post('/calendar/store', requestData)
      .then(response => {
        setCalendarEntries([...calendarEntries, response.data.calendar]);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Erro ao salvar:", error.response?.data || error);
      });
  };

  
  return (
    <AuthenticatedLayout
      header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Calendário
          </h2>
      }>
      <Head title="Calendar" />

      <div className="p-6">
        {/* Dropdown para selecionar o ano */}
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {[2022, 2023, 2024,2025].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
          <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{marginLeft: '20px'}} onClick={() => setIsRelatorioModalOpen(true)}>
            Relatório 
          </button>
          <RelatorioModal isOpen={isRelatorioModalOpen} onClose={closeRelatorioModal} />

        {/* Navegação por mês */}
        <div className="flex justify-between my-4">
          <button onClick={() => handleMonthChange(-1)}>←</button>
          <span>{new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })}</span>
          <button onClick={() => handleMonthChange(1)}>→</button>
        </div>

        {/* Grade de dias do mês */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button key={day} className={`flex items-center justify-center h-32 w-32 rounded-lg 
               ${calendarEntries.some(entry => new Date(entry.date).getDate() === day) 
                ? 'bg-green-500' : 'bg-gray-500 hover:bg-blue-600'}`}
              onClick={() => handleDayClick(day)} >
              {day}
            </button>
          ))}
        </div>

        {/* Modal para registrar exercício */}
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
  <div className="p-6">
    {/* Botão para fechar o modal */}
    <button
      onClick={() => setIsModalOpen(false)}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
    >
      &times;
    </button>

    {/* Título do modal */}
    <h2 className="text-2xl font-bold mb-6">Registro para o dia {selectedDay}</h2>

    {/* Seção de Ficha de Exercício */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Ficha de Exercício</h3>
      <div className="flex flex-col space-y-4">
        <label className="text-gray-700">Selecione uma ficha:</label>
        <select
          value={selectedSheet}
          onChange={(e) => setSelectedSheet(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma ficha</option>
          {workoutSheets.map((sheet) => (
            <option key={sheet.id} value={sheet.id}>
              {sheet.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Seção de Dieta */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Dieta</h3>
      <div className="flex flex-col space-y-4">
        <label className="text-gray-700">Selecione uma dieta:</label>
        <select
          value={selectedDiet}
          onChange={(e) => setSelectedDiet(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma dieta</option>
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Botões de ação */}
    <div className="flex space-x-4 mt-6">
      <button
        onClick={handleSaveEntry}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Confirmar
      </button>
      <button
        onClick={() => setIsModalOpen(false)}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Cancelar
      </button>
    </div>
  </div>
</Modal>
      </div>
    </AuthenticatedLayout>
  );
}
