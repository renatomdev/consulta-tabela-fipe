import { Injectable } from '@angular/core';
import { Modelos } from '../modelos/modelos';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  async getModelosPorCodigo(codigo: string): Promise<Modelos> {

    var url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`

    const data = await fetch(url);
    
    return await data.json() ?? {};
  }
}
