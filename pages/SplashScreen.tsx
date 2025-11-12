
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loading) {
                if(user) {
                    navigate('/subjects');
                } else {
                    navigate('/login');
                }
            }
        }, 1500); // Keep splash for a bit longer
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-bkg dark:bg-bkg-dark">
            <div className="text-center animate-fade-in">
                <div className="relative w-24 h-24 mb-4">
                     <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                     <div className="relative flex items-center justify-center w-full h-full bg-blue-500 rounded-full text-white font-bold text-3xl shadow-lg">
                        42
                     </div>
                </div>
                <h1 className="text-4xl font-bold font-poppins text-gray-800 dark:text-white">
                    Page <span className="text-primary dark:text-accent">42</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your private study hub.</p>
            </div>
        </div>
    );
};

export default SplashScreen;
