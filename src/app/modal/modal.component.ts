import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { FormControl } from '@angular/forms';

export interface ITodoText {
  title: string,
  description: string,
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('stateChange', [
      state('open',
        style({
          opacity: 1,
        })
  	  ),
      state('closed',
        style({
          opacity: 0,
        })
      ),
      transition('* => *', animate('300ms')),
    ])
  ]
})

export class ModalComponent implements OnInit {
  @Input() show: boolean = false
  @Input() windowTitle: string = ''
  @Input() title: string = ''
  @Input() description: string = ''
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter()
  @Output() clickSave: EventEmitter<ITodoText> = new EventEmitter()

  modalTitle: FormControl
  modalDescription: FormControl
  toggleError = false

  constructor() { }
  
  ngOnInit(): void {
    this.modalTitle = new FormControl(this.title)
    this.modalDescription = new FormControl(this.description)
  }

  clickCloseBtn() {
    this.clickClose.emit()
  }
  clickSaveBtn() {
    const title = this.modalTitle.value.trim()
    const description = this.modalDescription.value.trim()
    if (title.length > 0) {
      const item: ITodoText = {
        title,
        description
      }
      this.modalTitle.setValue('')
      this.modalDescription.setValue('')
  
      this.clickSave.emit(item)
    } else {
      this.showError()
    }
  }

  showError() {
    this.toggleError = true
    setTimeout(() =>{
      this.toggleError = false
    }, 2000)
  }

}
