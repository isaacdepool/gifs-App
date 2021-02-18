import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor( private gifsSvc: GifsService) { 

  }

  get historial(){
    return this.gifsSvc.historial
  }
  
  buscar( arg: string ){
    this.gifsSvc.buscarGifs(arg);
  }
  
  
  
}
