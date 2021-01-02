import { Injectable } from '@angular/core'

export interface ITodo {
  id: number
  title: string,
  description: string,
  done: boolean
}

@Injectable({ providedIn: 'root' })
export class TodosService {

  public todos: ITodo[] = [
    { id: 1,
      title: 'Реализовать SPA «Список задач» (aka «Todo List») на Angular 11',
      description: `
<h4>Требования:</h4><br>
Приложение должно позволять добавлять и редактировать задачи;<br>
Список задач должен сохранятся (обновление/закрытие страницы и т.п.);<br>
У каждой задачи есть статус: «Выполнено», «Не выполнено»;<br>
Пользователь может менять состояние задачи (в обе стороны);<br>
Выполненные задачи должны отображаться внизу списка;<br>
Продуманный UX/UI приветствуются (но не являются требованием).<br>
Результат работы необходимо представить в виде исходников (желательно на GitHub + GitHub Pages).<br>
      `,
      done: true
    },
    { id: 2, title: 'Передать ссылку на результат работы', description: 'Передать ссылки на исходники и рабочую версию', done: false},
  ].sort(this.sortTodos())

  sortTodos() {
    return (a: ITodo, b: ITodo) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1
      }

      return a.id < b.id ? 1 : -1
    }
  }

  getLastId() {
    let id = 0
    this.todos.forEach(element => {
      if (element.id > id) {
        id = element.id
      }
    })

    return id + 1
  }

  getData() {
    const data = localStorage.getItem('data')
    if (data !== null) {
      this.todos = JSON.parse(data)
    }
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.todos));
  }

  update(item: ITodo) {
    const idx = this.todos.findIndex(element => element.id === item.id)
    this.todos[idx] = {...item}

    this.todos.sort(this.sortTodos())
    this.saveData()
  }

  delete(item: ITodo) {
    this.todos = this.todos.filter(element => element.id !== item.id)
    this.saveData()
  }

  add(title: string, description: string) {
    const item: ITodo = {
      id: this.getLastId(),
      title,
      description,
      done: false
    }
    this.todos.push(item)
    this.todos.sort(this.sortTodos())
    this.saveData()
  }

}