import React from 'react';
import { Head, Link } from '@inertiajs/react';
import '../../css/navbar.css';

export default function Navbar({ auth }) {
    return (
        <nav className="navbar dark:navbar-dark">
            <div className="navbar-content">
                <a href="#" className="navbar-logo">
                    <img src="/storage/images/favicon.png" alt="Athlead" />
                    <span>Athlead</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <nav className="-mx-3 flex flex-1 justify-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="navbar-link"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="navbar-link">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="navbar-link">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
                <div className="navbar-links">
                    <a href="#" className="navbar-link dark:navbar-link-dark">Home</a>
                    <a href="#" className="navbar-link dark:navbar-link-dark">Sobre nós</a>
                    <a href="#" className="navbar-link dark:navbar-link-dark">Serviços</a>
                    <a href="#" className="navbar-link dark:navbar-link-dark">Nos contrate</a>
                </div>
            </div>
        </nav>
    );
};
