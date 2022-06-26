import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitComponent } from './fruit.component';
import { FormsModule } from '@angular/forms';
import { FruitService } from '../services/fruit.service';



@NgModule({
  declarations: [FruitComponent],
  imports: [
    CommonModule,FormsModule
  ],
  exports : [FruitComponent],
  providers: [FruitService],
})
export class FruitModule { }
