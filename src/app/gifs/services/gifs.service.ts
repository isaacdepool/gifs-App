import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Data } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UEQyopZn4gyMQJr4zJ8b6HXcmThlN9jZ';
  private svcUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  public resultado: Data[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor( private http: HttpClient ){

      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultado = JSON.parse(localStorage.getItem('data')!) || [];
    
  }
  
  buscarGifs( query:string ){

    query = query.trim().toLowerCase();
 
    if( !this._historial.includes(query) ){
      
      this._historial.unshift(query);
      
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this.historial));
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.svcUrl}/search`, { params })
      .subscribe( (res:SearchGifsResponse) =>{

          this.resultado = res.data;
          localStorage.setItem('data', JSON.stringify(this.resultado));

      });

    
    
  }


  
}
