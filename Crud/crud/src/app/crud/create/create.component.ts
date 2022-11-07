import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

import { ProdutoStatus } from '../enuns/status.enum';
import { EstoqueModel } from '../estoque.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  crudForm!: FormGroup;
  msg!: string;


  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]/)]],
      quantidade:['',[Validators.required,Validators.pattern(/[0-9]/)]],
      fornecedor:['',[Validators.required]],
      validade:['',[Validators.required]],
      categoria:['',[Validators.required]],

    });
  }

  cadastrar() {
    const crud = this.crudForm.getRawValue() as EstoqueModel;
    crud.validade = new Date();
    crud.status = ProdutoStatus.PENDENTE
    this.serviceService.cadastrar(crud);

    this.msg = "Cadastrado com sucesso!"
  }
  get nomeProduto() {return this.crudForm.get("nome")!}
}


