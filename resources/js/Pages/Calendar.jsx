import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from 'react-modal';
import RelatorioModal from '@/Components/RelatorioModal';

Modal.setAppElement('#app'); 

export default function Calendar() {
    const { user, workoutSheets, diets } = usePage().props;
    
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [calendarEntries, setCalendarEntries] = useState([]);

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRelatorioModalOpen, setIsRelatorioModalOpen] = useState(false);

    useEffect(() => {
        fetchRelatorio();
    }, [selectedYear, selectedMonth]);

    const fetchRelatorio = async () => {
        try {
            const response = await axios.get('/calendar/show');
            if (Array.isArray(response.data)) {
                setCalendarEntries(response.data);
            } else {
                console.warn('A resposta do servidor não é uma lista:', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do calendário:', error);
        }
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        const entry = calendarEntries.find(entry =>
            new Date(entry.date).getDate() === day &&
            new Date(entry.date).getMonth() === selectedMonth &&
            new Date(entry.date).getFullYear() === selectedYear
        );
        setSelectedEntry(entry || null);
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

        axios.post('/calendar/store', requestData)
            .then(response => {
                setCalendarEntries([...calendarEntries, response.data.calendar]);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Erro ao salvar:", error.response?.data || error);
            });
    };

    const handleDeleteEntry = (id) => {
      if (confirm('Você tem certeza que deseja deletar este registro?')) {
          axios.delete(`/calendar/${id}`)
              .then(() => {
                  alert('Registro excluído com sucesso!');
                  setCalendarEntries(calendarEntries.filter(entry => entry.id !== id));
                  setIsModalOpen(false);
              })
              .catch(error => {
                  console.error("Erro ao excluir registro:", error.response?.data || error);
              });
      }
  };


    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Calendário</h2>}
        >
            <Head title="Calendar" />

            <div className="p-6">
                {/* Dropdown para selecionar o ano */}
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                    {[2022, 2023, 2024, 2025].map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <button 
                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" 
                    onClick={() => setIsRelatorioModalOpen(true)}
                >
                    Relatório 
                </button>

                <RelatorioModal isOpen={isRelatorioModalOpen} onClose={() => setIsRelatorioModalOpen(false)} />

                {/* Navegação por mês */}
                <div className="flex justify-between my-4">
                    <button onClick={() => handleMonthChange(-1)}>←</button>
                    <span>{new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })}</span>
                    <button onClick={() => handleMonthChange(1)}>→</button>
                </div>

                {/* Grade de dias do mês */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => {
                        const entry = calendarEntries.find(entry =>
                            new Date(entry.date).getDate() === day &&
                            new Date(entry.date).getMonth() === selectedMonth &&
                            new Date(entry.date).getFullYear() === selectedYear
                        );

                        return (
                            <div key={day} className="flex flex-col items-center">
                                <button 
                                    className={`flex flex-col items-center justify-center h-32 w-32 rounded-lg border
                                        ${entry ? 'bg-green-500' : 'bg-gray-500 hover:bg-blue-600'}`} 
                                    onClick={() => handleDayClick(day)}
                                >
                                    <span className="text-lg font-bold">{day}</span>
                                </button>

                                {/* Exibir nomes da ficha e dieta abaixo do dia */}
                                {entry && (
                                    <div className="mt-1 text-sm text-gray-700 text-center">
                                        {entry.workout_sheet && (
                                            <div className="text-blue-700 font-medium">{entry.workout_sheet.name}</div>
                                        )}
                                        {entry.diet && (
                                            <div className="text-yellow-700 font-medium">{entry.diet.name}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Modal para registrar/excluir exercício */}
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <div className="p-6">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            &times;
                        </button>

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
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                            <button onClick={handleSaveEntry} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                Confirmar
                            </button>
                            {selectedEntry && (
                                <button onClick={() => handleDeleteEntry(selectedEntry.id)} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                                    Deletar
                                </button>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
