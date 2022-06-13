import { Category } from "src/app/product/models/categoria";

export class LiveNovoProduto {
  id: string;
  codigo: string;
  descricao: string;
  especificacao: string;
  ativo: number;
  categoriaId: number;
  categoria: Category;
  preco: number;
  precoCusto: number;
idLive: string;

}
