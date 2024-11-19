import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import AboutUsJumbotron from '../Components/AboutUsJumbotron';
import Footer from '../Components/Footer';
import { Head, Link } from '@inertiajs/react';

export default function AboutUs({ auth, laravelVersion, phpVersion }) {
    const [isVisible, setIsVisible] = useState(false);
    const h2Ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });
        if (h2Ref.current){
            observer.observe(h2Ref.current);
        }

        return () =>{
            if (h2Ref.current){
                observer.unobserve(h2Ref.current);
            }
        };
    }, []);
    return (
        <div>
            <Navbar auth={auth}/>
            <div className = "pt-16">
                <AboutUsJumbotron />
            </div>
            <div className = "pt-16">
                <Footer laravelVersion={laravelVersion} phpVersion={phpVersion}/>
            </div>
        </div>
    );
}