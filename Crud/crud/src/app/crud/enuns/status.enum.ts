export enum ProdutoStatus {
  PENDENTE,
  EM_ANDAMENTO,
  CONCLUIDO
}

export const CrudStatusLabel = new Map<number, string>([
  [ProdutoStatus.PENDENTE, 'Pendente'],
  [ProdutoStatus.EM_ANDAMENTO, 'Em andamento'],
  [ProdutoStatus.CONCLUIDO, 'Concluido'],
]);
