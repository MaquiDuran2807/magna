import apiClient from "../apiClient";
import { Brochure, EquiposAndTech,  Servicio2 } from "../types/types";
import { ProyectosMagna,ProyectImagesMagna  } from "../types/projects";


export const fetchWorkers = async () => {
    try {
        const response = await apiClient.get<EquiposAndTech>('equipos/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}


export const fetchServices1 = async () => {
    try {
        const response = await apiClient.get<Servicio2>('servicios/servicios-and-subservicios/')
        console.log(response.data, 'aqui estoy en fetchServices');
        
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}

export const fetchProjects = async () => {
    try {
        const response = await apiClient.get<ProyectosMagna>('proyectos/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}

export const fetchProjectsImages = async () => {
    try {
        const response = await apiClient.get<ProyectImagesMagna>('proyectos/images/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}

export const fetchBrochure = async () => {
    try {
        const response = await apiClient.get<Brochure[]>('servicios/brochure/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}



