import { Component } from '@angular/core';
import { TodosService } from './api/todos.service';
import { ITodoText } from '../app/modal/modal.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(public todosService: TodosService) {}

  public openModal = false

  ngOnInit() {
    this.todosService.getData()
  }

  save(item: ITodoText) {
    this.todosService.add(item.title, item.description)
    this.openModal = false
  }
}
