import { Component, Input,Output,EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Pregunta, Item } from '../../models/survey';
import { ItemComponent } from '../../item/item/item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ItemComponent,FormsModule,CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() pregunta!: Pregunta;
  @Input() index!: number;
  @Output() questionUpdated = new EventEmitter<void>();
  editing = false;

  constructor(private surveyService: SurveyService) {}

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveQuestion(): void {
    this.editing = false;
    this.questionUpdated.emit();
  }

  deleteQuestion(): void {
    this.surveyService.removeQuestion(this.index);
    this.questionUpdated.emit();
  }

  addItem(): void {
    const newItem: Item = {
      titulo: 'Nuevo Ítem',
      type: 'text'
    };
    this.surveyService.addItem(this.index, newItem);
    this.questionUpdated.emit();
  }

  moveUp(): void {
    this.surveyService.moveQuestionUp(this.index);
    this.questionUpdated.emit();
  }

  moveDown(): void {
    this.surveyService.moveQuestionDown(this.index);
    this.questionUpdated.emit();
  }

  updateQuestion(): void {
    this.questionUpdated.emit();
  }
}