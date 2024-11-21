import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import AboutUsJumbotron from '../Components/AboutUsJumbotron';
import Footer from '../Components/Footer';
import { Head, Link } from '@inertiajs/react';
import HireUsTable from '@/Components/HireUsTable';

export default function HireUs({ auth, laravelVersion, phpVersion }) {
    return (
        <div>
            <Navbar auth={auth} />
            <div className="pt-32"> {/* Padding para evitar que o conteúdo seja cortado */}
                <p className="text-center text-gray-900 text-7xl dark:text-white">
                    Conheçam os nossos colaboradores
                </p>
                <p className="mt-4 text-center tracking-widest text-gray-500 md:text-lg dark:text-gray-400">
                    Estamos todos disponíveis para contratações, CLT ou PJ, e trabalhos freelance.
                </p>
            </div>
            <div className="pt-20 grid grid-cols-3 gap-4">
                <HireUsTable
                    employeeImage={"/storage/images/imagemdani.jpg"}
                    text1={"Teste 1"}
                    text2={"Teste 2"}
                    text3={"Teste 3"}
                />
                <HireUsTable
                    employeeImage={"/storage/images/imagemtony2.png"}
                    text1={"Outro Teste 1"}
                    text2={"Outro Teste 2"}
                    text3={"Outro Teste 3"}
                />
                <HireUsTable
                    employeeImage={"/storage/images/imagemsavio.jpg"}
                    text1={"Mais um Teste 1"}
                    text2={"Mais um Teste 2"}
                    text3={"Mais um Teste 3"}
                />
            </div>
            <div className="pt-16">
                <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </div>
    );
}