import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodosComponent} from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosComponent],
  template: `
    <h1>Todo List</h1>

<app-todos/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'todo-list';
}
