export interface TareaI {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaInicio: string;
  fechaTermino: number;
  estado: [];
  subtareas: [];
}
