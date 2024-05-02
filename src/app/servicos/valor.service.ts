import { Injectable } from '@angular/core';
import { Valor } from '../modelos/valor';

@Injectable({
  providedIn: 'root'
})
export class ValorService {

  async getValor(codigoMarca:string, codigoModelo:string, codigoAno:string): Promise<Valor> {
    
    var url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`

    const data = await fetch(url);

    return await data.json() ?? [];
  }
}
