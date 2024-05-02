import { Injectable } from '@angular/core';
import { Marcas } from '../modelos/marcas';

@Injectable({
  providedIn: 'root'
})

export class MarcasService {

  protected url         :string   = "https://parallelum.com.br/fipe/api/v1/carros/marcas";
  
  async getAllMarcas(): Promise<Marcas[]> {
    
    const data = await fetch(this.url);

    return await data.json() ?? [];
  }
}
