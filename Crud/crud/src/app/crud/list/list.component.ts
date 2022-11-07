import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

import { CrudStatusLabel } from '../enuns/status.enum';
import { EstoqueModel } from '../estoque.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cruds!: EstoqueModel[];
  displayedColumns: string[] = ['nome', 'status', 'quantidade', 'fornecedor', 'validade', 'categoria', 'edit', 'remove'];
  dataSource!: MatTableDataSource<EstoqueModel>;

  clickedRow!: EstoqueModel;


  constructor(private serviceService: ServiceService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router) {
      this.matIconRegistry.addSvgIcon(
        "kickstarter",
        this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icones/kickstarter.svg"));
     }

  ngOnInit(): void {
    this.cruds = this.serviceService.listar();
    this.dataSource = new MatTableDataSource(this.cruds);
  }
  listar(): EstoqueModel[] {
    return this.cruds;
  }

  remover(id:string): void {
    this.serviceService.remover(id);
  }

  crudStatusLabel(status:number):string {
    return CrudStatusLabel.get(status)!;
  }
  alterarStatus(id:string) {}
  editar(id:string): void {
    this.router.navigate(["/products/edit",id]);
  }

}
