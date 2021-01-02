import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ModalComponent } from './modal/modal.component';
import { ClickOutsideDirective } from '../app/api/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ModalComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
