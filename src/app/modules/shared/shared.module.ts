import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridSearchPipe } from "./components/pipe/datagrid-search.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GridSearchPipe
  ],
  exports:[
    GridSearchPipe
  ],
  providers: [

  ]
})
export class SharedModule { }
