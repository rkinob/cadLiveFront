import { Usuario } from "./usuario";

export class UsuarioRequest {
  Usuario: Usuario;
  CodigoLogin: string;
  NumeroTentativaLogin: number;
  FlagBloqueado: number;
  FlagAtivo: number;
  PrimeiroAcesso: boolean;
  Sessao: Date;

}
