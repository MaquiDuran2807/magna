export interface AuthResponse {
      access: string;
      refresh: string;
  }
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  
  export interface User {
    _id: string;
    name: string;
    username: string;
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    
    access: string;
    error?: string;
  }

  export interface RootInterface {
    getServicios: getServicio;
    servicios: Servicio[];
    subServicios: SubServicio[];
    servicios_: ServiciosId[];
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
  }

  export interface getServicio {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  }

  // equipos types
  // To parse this data:
//
//   import { Convert } from "./file";
//
//   const equipos = Convert.toEquipos(json);

export interface Equipos {
  id:          number;
  nombre:      string;
  descripcion: string;
  posicion:    string;
  imagen:      string;
}

// Converts JSON strings to/from your types
//   import { Convert } from "./file";
//
//   const equipos = Convert.toEquipos(json);
export interface Equipos {
  id:          number;
  nombre:      string;
  descripcion: string;
  posicion:    string;
  imagen:      string;
}

export class Convert {
  public static toEquipos(json: string): Equipos[] {
      return JSON.parse(json);
  }

  public static equiposToJson(value: Equipos[]): string {
      return JSON.stringify(value);
  }
}

export interface ProyectosMagna {
  proyectos:    Proyecto[];
  imagenes:     Imagene[];
  ciudad:       Ciudad[];
  type_project: TypeProject[];
  pais:         Pais[];
  departamento: Departamento[];
  client:       Client[];
}

export interface Ciudad {
  id:           number;
  nombre:       string;
  departamento: number;
}

export interface Client {
  id:    number;
  name:  string;
  email: string;
  phone: string;
  logo:  string;
}

export interface Departamento {
  id:     number;
  nombre: string;
  pais:   number;
}

export interface Imagene {
  id:       number;
  imagen:   string;
  proyecto: number;
}

export interface Pais {
  id:     number;
  nombre: string;
}

export interface Proyecto {
  id:           number;
  nombre:       string;
  descripcion:  string;
  fecha_inicio: Date;
  fecha_fin:    Date;
  estado:       string;
  servicios:    number[];
  subservicios: number[];
  ciudad:       number;
  tipo:         number;
}

export interface TypeProject {
  id:   number;
  name: string;
}


