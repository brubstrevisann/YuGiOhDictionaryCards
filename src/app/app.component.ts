import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { from } from 'rxjs';
import { YugiohCardsService } from './services/yugioh-cards.service'
import { YugiohCardsModel } from './models/yugioh-cards.model'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit {
  title = 'CardsBrubs';
  page: number = 1;
  form: FormGroup
  nome:any;

  listaYugiohCards: YugiohCardsModel
  cardSelecionado: YugiohCardsModel;
  public modalRef: BsModalRef;

  constructor(private yugiohService: YugiohCardsService,
              private modalService: BsModalService,
    ) { }


  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listarTodosCards();

  }

  listarTodosCards() {
    this.yugiohService.listarTodos().subscribe(
      (result: any) => {
        console.log(this.listaYugiohCards)
        this.listaYugiohCards = result.data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  listarCardsPorNome(){
    this.yugiohService.listarPorNome(this.nome).subscribe(
      (result: any) => {
        console.log(this.listaYugiohCards)
        this.listaYugiohCards = result.data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }


 public openModal(template: TemplateRef<any>,item:any) {
    this.modalRef = this.modalService.show(template,{class:'modal-content'});
    this.cardSelecionado = item
  }
  public hideModal() {
    this.modalRef.hide();
 
    // this.form.markAsPristine();
   
  }
}

