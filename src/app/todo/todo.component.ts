import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { ITodo, TodosService } from '../api/todos.service';
import { ITodoText } from '../modal/modal.component'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
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
export class TodoComponent implements OnInit {

  @Input() todo: ITodo
  
  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
  }

  openDescription = false
  openMenu = false
  openModal = false

  done() {
    this.openMenu = false
    this.todo.done = true
    this.todosService.update(this.todo)
  }
  undone() {
    this.openMenu = false
    this.todo.done = false
    this.todosService.update(this.todo)
  }
  edit() {
    this.openMenu = false
    this.openModal = true
  }
  delete() {
    this.openMenu = false
    this.todosService.delete(this.todo)
  }
  update(item: ITodoText, element: ITodo) {
    element.title = item.title
    element.description = item.description
    this.todosService.update(element)
  }
  closeMenu() {
    if (this.openMenu) {
      this.openMenu = false
    }    
  }
}
