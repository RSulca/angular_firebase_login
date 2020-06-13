export class UsuarioModel {
    email: string;
    password: string;
    nombre: string;
    constructor(email: string, password: string, nombre: string) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
    }
}