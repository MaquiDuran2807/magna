import apiClient from "../apiClient";
import { EquiposAndTech, ServecesMagna } from "../types/types";
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

export const fetchServices = async () => {
    try {
        const response = await apiClient.get<ServecesMagna>('servicios/')
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

