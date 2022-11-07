import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

import { ProdutoStatus } from '../crud/enuns/status.enum';
import { EstoqueModel } from '../crud/estoque.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  cadastrar(crud: EstoqueModel): void {
    let cruds:EstoqueModel[] = this.listar();
    crud.id = uuid.v4();
    cruds.push(crud);
    console.log(cruds);
    localStorage.setItem('cruds', JSON.stringify(cruds));

  }

  atualizar(crud: EstoqueModel): void {
    let cruds:EstoqueModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(crud.id === cruds[i].id) {
        cruds[i] = crud;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }

  localizarPortId(id:string): EstoqueModel {
    const cruds:EstoqueModel[] = this.listar();
    let crud!:EstoqueModel;
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        crud = cruds[i];
        break;
      }
    }
    return crud;
  }

  listar(): EstoqueModel [] {
    //return JSON.parse(localStorage.getItem('cruds') || '{}') ?? [];
     return JSON.parse(localStorage.getItem('cruds')!) as EstoqueModel[] ?? [];
  }

  remover(id: string): void {
    let cruds:EstoqueModel[] = this.listar();

    let novoCruds: EstoqueModel[] = [];
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id !== id) {
        novoCruds.push(cruds[i]);
      }
    }
    cruds = novoCruds;
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }

  alteraStatus(id:string, status:ProdutoStatus) {
    const cruds:EstoqueModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        cruds[i].status = status;
        if(status === ProdutoStatus.CONCLUIDO) {
          cruds[i].validade = new Date();
        }
        break;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
}



