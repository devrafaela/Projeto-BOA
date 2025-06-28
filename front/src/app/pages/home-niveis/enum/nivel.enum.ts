import { StatusNivel } from "./statusNivel.enum";

export interface Nivel {
    id: number;
    nome: string;
    status: StatusNivel;
    bloqueado: boolean;

}
