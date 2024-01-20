import React, { useState } from 'react';
import { NavBar } from '../components/navBar';
import { useAuth } from '../auth/AuthProvider';

export const Cotizador: React.FC = () => {

    const auth=useAuth();
    console.log( "isAuthenticated ",auth.isAuthenticated);

    const logout = () => {
        auth.signout();
      };
    
    const [respuestas, setRespuestas] = useState<{ [pregunta: string]: number }>({});

    // Aquí puedes obtener las preguntas y sus valores desde la base de datos
    const preguntas = [
        { pregunta: 'Pregunta 1', opciones: ['Opción 1', 'Opción 2', 'Opción 3'], valores: [10, 20, 30] },
        { pregunta: 'Pregunta 2', opciones: ['Opción A', 'Opción B', 'Opción C'], valores: [15, 25, 35] },
        { pregunta: 'Pregunta 3', opciones: ['Opción X', 'Opción Y', 'Opción Z'], valores: [5, 10, 15] },
    
        // Agrega más preguntas aquí
    ];
    const [total, setTotal] = useState(0);

    const handleRespuesta = async (pregunta: string, valor: number) => {
        await calcularCostoServicio();
        setRespuestas((prevRespuestas) => ({
            ...prevRespuestas,
            [pregunta]: valor,
            
        }));
        
        
    };

    const calcularCostoServicio = () => {
        const costoTotal = Object.values(respuestas).reduce(
            (total, valor) => total + valor,
            0
        );
        // Aquí puedes hacer algo con el costo total, como mostrarlo en pantalla o enviarlo al servidor
        console.log('Costo total del servicio:', costoTotal);
        setTotal(costoTotal);
    };

    return (
        <div>
            <NavBar />
            <button onClick={logout} style={{padding:"100px"}}>Logout</button>
            <br />
            <br />
            <h1>Cotizador de Servicios</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.pregunta}>
                            <p>{pregunta.pregunta}</p>
                            {pregunta.opciones.map((opcion, index) => (
                                <button
                                    key={opcion}
                                    onClick={() => handleRespuesta(pregunta.pregunta, pregunta.valores[index])}
                                    
                                >
                                    {opcion}
                                    <span>
                                        {respuestas[pregunta.pregunta] === pregunta.valores[index] && ' ✅'}

                                    </span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Tarjeta de Valor</h2>
                    {Object.entries(respuestas).map(([pregunta, valor]) => (
                        <div key={pregunta}>
                            <p>{pregunta}</p>
                            <p>Valor: {valor}</p>
                        </div>
                    ))}
                    <h6>
                        Total: {total}
                    </h6>
                </div>
            </div>
            <button onClick={calcularCostoServicio}>Calcular Costo</button>
        </div>
    );
};



// export const Cotizador: React.FC = () => {
//   const [respuestas, setRespuestas] = useState<{ [pregunta: string]: number }>({});

//   // Aquí puedes obtener las preguntas y sus valores desde la base de datos
//   const preguntas = [
//     { pregunta: 'Pregunta 1', valor: 10 },
//     { pregunta: 'Pregunta 2', valor: 20 },
//     { pregunta: 'Pregunta 3', valor: 15 },
//     // Agrega más preguntas aquí
//   ];

//   const handleRespuesta = (pregunta: string, valor: number) => {
//     setRespuestas((prevRespuestas) => ({
//       ...prevRespuestas,
//       [pregunta]: valor,
//     }));
//   };

//   const calcularCostoServicio = () => {
//     const costoTotal = Object.values(respuestas).reduce(
//       (total, valor) => total + valor,
//       0
//     );
//     // Aquí puedes hacer algo con el costo total, como mostrarlo en pantalla o enviarlo al servidor
//     console.log('Costo total del servicio:', costoTotal);
//   };

//   return (
//     <div>
//       <h1>Cotizador de Servicios</h1>
//       {preguntas.map((pregunta) => (
//         <div key={pregunta.pregunta}>
//           <p>{pregunta.pregunta}</p>
//           <button onClick={() => handleRespuesta(pregunta.pregunta, pregunta.valor)}>
//             Responder
//           </button>
//         </div>
//       ))}
//       <button onClick={calcularCostoServicio}>Calcular Costo</button>
//     </div>
//   );
// };


