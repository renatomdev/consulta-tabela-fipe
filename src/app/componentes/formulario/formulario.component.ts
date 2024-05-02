import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';

import { Marcas } from '../../modelos/marcas';
import { Modelos } from '../../modelos/modelos';
import { Anos } from '../../modelos/anos';
import { Valor } from '../../modelos/valor';
import { Filtros } from '../../modelos/filtros';

import { MarcasService } from '../../servicos/marcas.service';
import { ModelosService } from '../../servicos/modelos.service';
import { AnosService } from '../../servicos/anos.service';
import { ValorService } from '../../servicos/valor.service';

@Component({
  selector: 'formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {

  marcaService: MarcasService     = inject(MarcasService);
  modeloService: ModelosService   = inject(ModelosService);
  anoService: AnosService         = inject(AnosService);
  valorService: ValorService      = inject(ValorService);

  marcasLista                     : Marcas[] = [];
  anosLista                       : Anos[] = [];
  modelosLista!                   : Modelos;
  modeloValor!                    : Valor;
  filtros!                        : Filtros;

  marcaSelecionada:string         = '';
  modeloSelecionado:string        = '';
  anoSelecionado:string           = '';
  formularioPreenchido:boolean    = false;
 
  constructor(public dialog: MatDialog) {
    this.inicializarObjetos();
  }

  inicializarObjetos() {
    this.modelosLista   = {anos:[{codigo:'0', nome:''}],modelos:[{codigo: 0,nome: ''}]}
    this.modeloValor    = {TipoVeiculo: 0, Valor: '0', Marca: '',  Modelo: '', AnoModelo: 0, Combustivel: '', CodigoFipe: '', MesReferencia: '', SiglaCombustivel: ''}
    this.filtros        = {marca: '', modelo: '', ano: ''}
  }

  ngOnInit() {
    this.marcaService.getAllMarcas().then((retorno: Marcas[]) => {
      this.marcasLista = retorno;
    });
  }

  getModelos(){
    this.modeloService.getModelosPorCodigo(this.filtros.marca).then((retorno: Modelos) => {
      this.modelosLista         = retorno;
      //this.Filtros.marca      = '';
    });
  }

  getAnos(){
    this.anoService.getAnosByCodigos(this.filtros.marca, this.filtros.modelo).then((retorno: Anos[]) => {
      this.anosLista = retorno;
    });
  }

  getValores(){
    this.valorService.getValor(this.filtros.marca, this.filtros.modelo, this.filtros.ano).then((retorno: Valor) => {
      this.modeloValor = retorno;

      const dialogRef = this.dialog.open(
        DialogResultado
        , {data: this.modeloValor}
      );
  
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed')
      });

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      DialogResultado
      , {data: this.filtros}
    );

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed')
    });
  }
}

//---------------------------------------------------------- Pop-up resultado consulta ----------------------------------------------------------

@Component({
  selector: 'formulario.dialog.resultado',
  templateUrl: 'formulario.dialog.resultado.html',
  styleUrl: './formulario.dialog.resultado.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDivider,
    MatDividerModule,
    AsyncPipe
  ],
})
export class DialogResultado {
  
  constructor(
    public dialogRef: MatDialogRef<DialogResultado>
    , @Inject(MAT_DIALOG_DATA) public data: Valor
  ) {
    this.dialogRef.updateSize('30%', '65%');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}