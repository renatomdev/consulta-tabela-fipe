import { Injectable } from '@angular/core';
import { Anos } from '../modelos/anos';

@Injectable({
  providedIn: 'root'
})
export class AnosService {

  async getAnosByCodigos(codigoMarca:string, codigoModelo:string): Promise<Anos[]> {
    
    var url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`

    //console.log('url' + url);

    const data = await fetch(url);

    return await data.json() ?? [];
  }
}
