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

  constructor(private surveyService: SurveyService) {}

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveItem(): void {
    this.editing = false;
    this.surveyService.editItem(this.questionIndex, this.itemIndex, this.item);
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
}