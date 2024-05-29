import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Item } from '../../models/survey';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../../question/question/question.component';



@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: Item;
  @Input() questionIndex!: number;
  @Input() itemIndex!: number;
  @Output() itemUpdated = new EventEmitter<void>();
  editing = false;
  editingOptions = false; // Variable para manejar la edición de opciones

  constructor(private surveyService: SurveyService) {}

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveItem(): void {
    this.editing = false;
    this.itemUpdated.emit();
  }

  deleteItem(): void {
    this.surveyService.removeItem(this.questionIndex, this.itemIndex);
    this.itemUpdated.emit();
  }

  moveUp(): void {
    this.surveyService.moveItemUp(this.questionIndex, this.itemIndex);
    this.itemUpdated.emit();
  }

  moveDown(): void {
    this.surveyService.moveItemDown(this.questionIndex, this.itemIndex);
    this.itemUpdated.emit();
  }

  // Métodos para manejar opciones
  addOption(): void {
    if (!this.item.options) {
      this.item.options = [];
    }
    this.item.options.push('Nueva opción');
    this.itemUpdated.emit();
  }

  deleteOption(index: number): void {
    if (this.item.options) {
      this.item.options.splice(index, 1);
      this.itemUpdated.emit();
    }
  }

  saveOption(index: number, newValue: string): void {
    if (this.item.options) {
      this.item.options[index] = newValue;
      this.itemUpdated.emit();
    }
  }

  toggleEditOptions(): void {
    this.editingOptions = !this.editingOptions;
  }
}