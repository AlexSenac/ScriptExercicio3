import { ProdutoStatus } from "./enuns/status.enum";

export interface EstoqueModel {
  id: string,
  nome: string,
  status: ProdutoStatus,
  quantidade: number,
  fornecedor: string,
  validade: Date,
  categoria: string,
}
