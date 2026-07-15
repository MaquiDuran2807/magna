
import { useState,useEffect } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from '../../page/assets/img/logo6.webp'

export const FloatWhatsapp = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event:any,value:any) => {
        event.preventDefault();
        setMessage(event.target.value);
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
        />
    );
}

export default FloatWhatsapp
