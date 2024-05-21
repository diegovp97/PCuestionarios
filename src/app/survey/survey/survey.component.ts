import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey, Pregunta,Item } from '../../models/survey';
import { QuestionComponent } from '../../question/question/question.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemComponent } from '../../item/item/item.component';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [QuestionComponent,FormsModule,CommonModule, ItemComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit {
  survey$!: Observable<Survey | null>;
  editingSurvey = false;

  constructor(public surveyService: SurveyService) {}

  ngOnInit(): void {
    this.survey$ = this.surveyService.survey$;
  }

  addQuestion(): void {
    const newQuestion: Pregunta = {
      titulo: 'Nueva Pregunta',
      subtitulo: '',
      items: []
    };
    this.surveyService.addQuestion(newQuestion);
  }

  updateSurvey(): void {
    this.surveyService.updateSurvey(this.surveyService.survey_model!);
  }

  editSurvey(): void {
    this.editingSurvey = true;
  }

  saveSurvey(): void {
    this.editingSurvey = false;
    this.surveyService.updateSurvey(this.surveyService.survey_model!);
  }

  cancelEdit(): void {
    this.editingSurvey = false;
    this.surveyService.surveySubject.next(this.surveyService.survey_model);
  }
}