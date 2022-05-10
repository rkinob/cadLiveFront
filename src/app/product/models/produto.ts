import { Category } from "./categoria";

export class Produto {
  id: number;
  nome: string;
  especificacao: string;
  active: boolean;
  categoriaId: number;
  categoria: Category;
  preco: number;
  precoCusto: number;

}
