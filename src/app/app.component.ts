import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopoComponent } from './componentes/topo/topo.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { TabelaResultadoComponent } from './componentes/tabela-resultado/tabela-resultado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopoComponent, FormularioComponent, TabelaResultadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'consulta-tabela-fipe';
}
