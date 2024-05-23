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
  editingSurvey: boolean = false;

  constructor(public surveyService: SurveyService) {}

  ngOnInit(): void {
    this.survey$ = this.surveyService.survey$;
  }

  editSurvey() {
    this.editingSurvey = true;
  }

  saveSurvey() {
    this.surveyService.updateSurvey(this.surveyService.getSurveySnapshot()!);
    this.editingSurvey = false;
  }

  cancelEdit() {
    this.editingSurvey = false;
  }

  addQuestion(): void {
    const newQuestion: Pregunta = {
      titulo: 'Nueva Pregunta',
      subtitulo: '',
      items: []
    };
    this.surveyService.addQuestion(newQuestion);
  }
}