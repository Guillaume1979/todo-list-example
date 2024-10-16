import {computed, Injectable, signal} from '@angular/core';

interface Todo {
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([])
  readonly allTodos = computed(() => this.todos());
  readonly activeTodos = computed(() => this.todos().filter(todo => !todo.isCompleted))
  readonly completedTodos = computed(() => this.todos().filter(todo => todo.isCompleted))


  addTodo(title: string) {
    this.todos.update(todos => [...todos, {title, isCompleted: false}])
  }

  changeStatus(title: string) {
    this.todos.update(todos =>
      todos.map(todo => {
        if (todo.title === title) {
          return {...todo, isCompleted: !todo.isCompleted}
        } else {
          return todo
        }
      })
    )
  }

  deleteTodo(title: string) {
    this.todos.update(todos => todos.filter(todo => todo.title !== title))
  }
}
