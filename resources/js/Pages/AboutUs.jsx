import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import H1 from '../Components/H1';
import H2 from '../Components/H2';
import H3 from '@/Components/H3';
import Footer from '../Components/Footer';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage({ auth, laravelVersion, phpVersion }) {
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
                <H1 />
            </div>
            <div ref={h2Ref} className={isVisible ? "slide-in-active" : "slide-in"}>
                <H2 />
            </div>
            <div className = "pt-16">
                <H3 />
            </div>
            <div className = "pt-16">
                <Footer laravelVersion={laravelVersion} phpVersion={phpVersion}/>
            </div>
        </div>
    );
}