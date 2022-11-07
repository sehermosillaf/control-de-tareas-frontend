
export interface UsuarioI {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    enabled: number;
    roles: string[];
}
