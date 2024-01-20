
import { useState,useEffect } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from '../assets/img/logo6.png'

export const FloatWhatsapp = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Aquí puedes cambiar el estado del mensaje si es necesario
        console.log(message);
        
        window.open(`https://wa.me/3132356306?text=${encodeURIComponent(message)}`);
        setMessage('Nuevo mensaje');
    };

    useEffect(() => {
       handleSubmit;
    }, []);

    return (
        <FloatingWhatsApp
            phoneNumber="3132356306"
            accountName="Magna"
            avatar={logo}
            allowClickAway
            allowEsc
            statusMessage='Ingeniería y Topografía S.A.S.'
            notification=  {true}
            chatMessage="Hola, ¿En qué podemos ayudarte?"
            onSubmit={handleSubmit}
            // Aquí puedes agregar más props según tus necesidades
        />
    );
}