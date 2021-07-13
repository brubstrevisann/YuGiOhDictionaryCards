import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Query, TemplateRef } from '@angular/core';
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
  types = ["Effect Monster",
    // "Flip Effect Monster",
    // "Flip Tuner Effect Monster",
    // "Gemini Monster",
    // "Normal Monster",
    // "Normal Tuner Monster",
    // "Pendulum Effect Monster",
    // "Pendulum Flip Effect Monster",
    // "Pendulum Normal Monster",
    // "Pendulum Tuner Effect Monster",
    // "Ritual Effect Monster",
    // "Ritual Monster",
    "Skill Card",
    "Spell Card",
    // "Spirit Monster",
    // "Toon Monster",
    "Trap Card"
    // "Tuner Monster",
    // "Union Effect Monster"
  ]
  selectedTypes: any;
  page: number = 1;
  form: FormGroup
  nome: any;

  listaYugiohCards: YugiohCardsModel
  cardSelecionado: YugiohCardsModel;
  public modalRef: BsModalRef;

  constructor(private yugiohService: YugiohCardsService,
    private modalService: BsModalService,
  ) { }


  ngOnInit() {

    this.listarTodosCards();

    this.selectedTypes = []

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

  listarCardsPorNome() {
    if (this.nome) {
      if (this.selectedTypes) {
        this.yugiohService.listarPorNomeETipos(this.nome, this.montarQueryParams(this.selectedTypes))
      }
      this.yugiohService.listarPorNome(this.nome).subscribe(
        (result: any) => {
          console.log(this.listaYugiohCards)
          this.listaYugiohCards = result.data;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    } else {
      this.listarTodosCards();
    }


  }


  public openModal(template: TemplateRef<any>, item: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-content' });
    this.cardSelecionado = item
  }
  public hideModal() {
    this.modalRef.hide();
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.selectedTypes.push(e.target.value);
    } else {
      let i: number = 0;
      this.selectedTypes.forEach((item: any) => {
        if (item == e.target.value) {
          this.selectedTypes.splice(i);
          return;
        }
        i++;
      });
    }
  }

  montarQueryParams(e) {
    let query = '';
    e.map((j) => {
      query = query + j + ','
    })

    return query.split(' ').join('%20');
  }
}

