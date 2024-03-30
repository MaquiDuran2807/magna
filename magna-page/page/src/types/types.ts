export interface AuthResponse {
      access: string;
      refresh: string;
  }
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  export type refreshResponse = {
    access: string;
  };
  
  export interface User {
    first_name: string
    last_name: string
    email: string
    id: number
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    access: string;
    error?: string;
  }

  export interface ServecesMagna {
    servicios: Servicio[];
    subServicios: SubServicio[];
  }

  export interface ServiciosId {
    id: number;
    nombre: string;
  }
  
  export interface SubServicio {
    id: number;
    servicio_id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  }
  
  export interface Servicio {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    icon: string;
  }

  export interface getServicio {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  }

  export interface EquiposAndTech {
    equipos:     Equipo[];
    tecnologias: Equipo[];
}

export interface Equipo {
    id:            number;
    nombre:        string;
    descripcion:   string;
    posicion?:     string;
    imagen_height: number;
    imagen_width:  number;
    imagen:        string;
}





export interface PreguntasyrespuestasMagna {
  id:        number;
  pregunta:  string;
  respuesta: string;
}



