import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopoComponent } from './componentes/topo/topo.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopoComponent, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'consulta-tabela-fipe';
}
