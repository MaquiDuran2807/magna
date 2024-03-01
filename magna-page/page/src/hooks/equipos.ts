
import axios from 'axios';
import {Convert } from '../types/types';


// Acción para guardar el resultado en Redux


// Función para realizar la petición a la API y guardar el resultado en Redux
export const fetchDataEquipo = () => {
    return async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/equipos/');
            
            const result = Convert.toEquipos(response.data);
            console.log(response.data, result);
            
            
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
};

export const ResultEquip =  fetchDataEquipo();
