import { Erro } from "./erro";

    export class ValidationSummary {
        Erros: Erro[];
        ResultCode: number;
        Title: string;
        Sucesso: boolean;
        Data: Date;
    }
