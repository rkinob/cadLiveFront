import { Category } from "./categoria";

export class Produto {
  id: string;
  codigo: string;
  descricao: string;
  especificacao: string;
  ativo: number;
  categoriaId: number;
  categoria: Category;
  preco: number;
  precoCusto: number;
  produtoPaiId: string;

}
