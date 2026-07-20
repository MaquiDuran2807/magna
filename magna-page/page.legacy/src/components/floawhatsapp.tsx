
import { useState,useEffect } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from '../assets/img/logo6.webp';

export const FloatWhatsapp = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Aquí puedes cambiar el estado del mensaje si es necesario
        setMessage(event.target.value);
        // capturar el mensaje y el destinatario para enviarlo a base de datos

        window.open(`https://wa.me/3015490115?text=${encodeURIComponent(message)}`);

    };

    useEffect(() => {
       handleSubmit;
    }, []);

    return (
        <FloatingWhatsApp
            phoneNumber="3015490115"
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

export default FloatWhatsapp;
