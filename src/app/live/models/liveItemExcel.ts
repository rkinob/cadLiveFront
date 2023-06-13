export class LiveItemExcel {
  constructor({
    codigo,
    categoria,
    descricao,
    especificacao,
    nomeCliente,
    preco,
    valorPago
  }: {
    codigo: string,
    categoria: string,
    descricao: string,
    especificacao: string,
    nomeCliente: string,
    preco: number,
    valorPago: number
  }) {
    this.codigo = codigo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.especificacao = especificacao;
    this.nomeCliente = nomeCliente;
    this.preco = preco;
    this.valorPago = valorPago;
  }

  codigo :string;
  categoria: string;
  descricao: string;
  especificacao: string;
  nomeCliente: string;
  preco: number;
  valorPago: number;

}

