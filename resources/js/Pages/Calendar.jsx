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
          
          {/* Botão para fechar o modal*/}
          <button onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            &times;
          </button>
          
          <h2>Registro de exercício para o dia {selectedDay}</h2>
          <label>Ficha de Exercício:</label>
        
          <select value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)}>
            <option value="">Selecione uma ficha</option>
            
            {workoutSheets.map((sheet) => (
              <option key={sheet.id} value={sheet.id}>{sheet.name}</option>           
            ))}
          </select>
          
          <button onClick={handleSaveEntry}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Confirmar
          </button>

          <button onClick={() => setIsModalOpen(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" >
            Cancelar
          </button>

          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <span>Fichas selecionadas</span>
            <DataTable
              label1={"Nome da ficha de exercício"}
              label4={"Ações"}
              data={calendarEntries.filter(entry => new Date(entry.date).getDate() === selectedDay)}
            />
          </div>





          <h2>Registro dieta para o dia {selectedDay}</h2>
          <label>Dieta:</label>
        
          <select value={selectedDiet} onChange={(e) => setSelectedDiet(e.target.value)}>
            <option value="">Selecione uma dieta</option>
            
            {diets.map((sheet) => (
              <option key={sheet.id} value={sheet.id}>{sheet.name}</option>           
            ))}
          </select>
          
          <button onClick={handleSaveEntry}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Confirmar
          </button>

          <button onClick={() => setIsModalOpen(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" >
            Cancelar
          </button>

          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <span>Dietas selecionadas</span>
            <DataTableDiet
              label1={"Nome da dieta"}
              label4={"Ações"}
              data={calendarEntries.filter(entry => new Date(entry.date).getDate() === selectedDay)}
            />   
          </div>

        </Modal>
      </div>
    </AuthenticatedLayout>
  );
}
