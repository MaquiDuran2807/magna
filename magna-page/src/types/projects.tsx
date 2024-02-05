export interface ProyectosMagna {
    count:    number;
      next:     string | null;
      previous: string | null;
      results:  Result[];
  }
  
  export interface Result {
    id:           number;
    nombre:       string;
    descripcion:  string;
    fecha_inicio: Date;
    fecha_fin:    Date;
    estado:       string;
    servicios:    Servicio[];
    subservicios: Servicio[];
    ciudad:       Ciudad;
    tipo:         Tipo;
}

export interface Ciudad {
    id:           number;
    departamento: Departamento;
    nombre:       string;
}

export interface Departamento {
    id:     number;
    pais:   Pais;
    nombre: string;
}

export interface Pais {
    id:     number;
    nombre: string;
}

export interface Servicio {
    id:           number;
    nombre:       string;
    descripcion:  string;
    imagen:       string;
    icon?:        string;
    servicio_id?: number;
}

export interface Tipo {
    id:   number;
    name: string;
}

export interface ProyectImagesMagna {
    id:       number;
    imagen:   string;
    proyecto: number;
}