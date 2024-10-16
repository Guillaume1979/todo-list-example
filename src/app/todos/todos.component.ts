import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {TodoService} from '../services/todo.service';


export type Status = 'ALL' | 'ACTIVE' | 'COMPLETED';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="todoForm">
      <input formControlName="title" (keyup.enter)="addTodo()">
    </form>
    <h2>All todos</h2>
    @for (todo of todoService.allTodos(); track todo) {
      <div>
        <input type="checkbox" [checked]="todo.isCompleted" (click)="todoService.changeStatus(todo.title)">
        <span>{{ todo.title }}</span>
        <button (click)="todoService.deleteTodo(todo.title)">X</button>
      </div>
    }
    <h2>Active todos</h2>
    @for (todo of todoService.activeTodos(); track todo) {
      <div>
        <span>{{ todo.title }}</span>
      </div>
    }

    <h2>Displayed todos</h2>
    @for (todo of displayedTodos(); track todo) {
      <div>
        <input type="checkbox" [checked]="todo.isCompleted" (click)="todoService.changeStatus(todo.title)">
        <span>{{ todo.title }}</span>
        <button (click)="todoService.deleteTodo(todo.title)">X</button>
      </div>
    }

        <button (click)="status.set('ALL')">ALL</button>
        <button (click)="status.set('ACTIVE')">Active</button>
        <button (click)="status.set('COMPLETED')">Completed</button>
  `,
  styles: ``
})

export class TodosComponent {
  fb = inject(FormBuilder);
  todoService = inject(TodoService);
  status: WritableSignal<Status> = signal('ALL');
  displayedTodos = computed(() => {
    switch (this.status()) {
      case "ACTIVE":
        return this.todoService.activeTodos();
      case "COMPLETED":
        return this.todoService.completedTodos();
      case "ALL":
        return this.todoService.allTodos()
      default:
        return this.todoService.allTodos();
    }

  });

  todoForm = this.fb.nonNullable.group({
    title: [''],
  })

  addTodo() {
    this.todoService.addTodo(this.todoForm.controls.title.value)
    this.todoForm.reset()
  }
}

