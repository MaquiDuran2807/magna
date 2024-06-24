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

  export interface Servicio2 {
    id:           number;
    nombre:       string;
    descripcion:  string;
    imagen:       string;
    icon:         string;
    imagen_tablet:string;
    imagen_celular:string;
    subservicios: Subservicio[];
    caracteristicas: Caracteristica[];
}

export interface Caracteristica {
  id:          number;
  nombre:      string;
  descripcion: string;
  servicio:    number;
}


export interface Subservicio {
    id:          number;
    nombre:      string;
    descripcion: string;
    imagen:      string;
    imagen_tablet:string;
    imagen_celular:string;
    servicio:    number;
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

export interface Brochure {
  nombre:  string;
  archivo: string;
}

