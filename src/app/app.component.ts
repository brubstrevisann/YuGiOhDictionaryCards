import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { from } from 'rxjs';
import { YugiohCardsService } from './services/yugioh-cards.service'
import { YugiohCardsModel } from './models/yugioh-cards.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CardsBrubs';
  page: number = 1;
  listaYugiohCards: YugiohCardsModel
  constructor(private yugiohService: YugiohCardsService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listarTodosCards();

  }

  listarTodosCards() {
    this.yugiohService.listarTodos().subscribe(
      (result: any) => {
        console.log(this.listaYugiohCards)
        this.listaYugiohCards = result.data;
        console.log(result)
        console.log("listaCards:" + this.listaYugiohCards.toString())
        this.stringify(this.listaYugiohCards)


      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }


  stringify(x) {
    console.log(Object.prototype.toString.call(x));
  }
}

