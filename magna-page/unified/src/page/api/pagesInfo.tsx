import apiClient from "../apiClient";
import { AboutData, Brochure, EquiposAndTech,  Servicio2, Slide, Subservicio } from "../types/types";
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
        const response = await apiClient.get<Servicio2[]>('servicios/servicios-and-subservicios/')
        console.log('[API] servicios-and-subservicios raw response:', JSON.parse(JSON.stringify(response.data)));
        response.data?.forEach((s: Servicio2) => {
            console.log(`[API] servicio: "${s.nombre}" (id=${s.id}), subservicios:`, s.subservicios?.map((sub: Subservicio) => ({id: sub.id, nombre: sub.nombre, img: sub.imagen})));
        });
        return response.data
    } catch (error) {
        console.log('[API] fetchServices1 ERROR:', error);
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
        const response = await apiClient.get<ProyectImagesMagna[]>('proyectos/images/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}

export const fetchSlides = async () => {
    try {
        const response = await apiClient.get<Slide[]>('servicios/slides/')
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

export const fetchAbout = async () => {
    try {
        const response = await apiClient.get<AboutData>('about/')
        return response.data
    } catch (error) {
        console.log(error);
        return
    }
}



