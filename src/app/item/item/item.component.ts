import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Item } from '../../models/survey';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;
  @Input() questionIndex!: number;
  @Input() itemIndex!: number;
  @Output() itemUpdated = new EventEmitter<void>();
  editing = false;
  editingOptions = false;
  selectedOption!: string;
  newOption: string = ''; // Variable para la nueva opción

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
    if (this.newOption.trim()) {
      this.item.options.push(this.newOption.trim());
      this.newOption = '';
      this.selectedOption = this.item.options[this.item.options.length - 1];
      this.itemUpdated.emit();
    }
  }

  deleteOption(option: string): void {
    const index = this.item.options!.indexOf(option);
    if (index > -1) {
      this.item.options!.splice(index, 1);
      this.selectedOption = this.item.options!.length > 0 ? this.item.options![0] : '';
      this.itemUpdated.emit();
    }
  }

  toggleEditOptions(): void {
    this.editingOptions = !this.editingOptions;
  }
}
