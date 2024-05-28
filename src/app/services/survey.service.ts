import {Injectable} from '@angular/core';
import {Survey, Pregunta, Item} from '../models/survey';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private localStorageKey = 'survey';
  public surveySource = new BehaviorSubject<Survey | null>(this.loadSurveyFromLocalStorage());
  survey$ = this.surveySource.asObservable();

  constructor() {
    console.log('Survey loaded from local storage:', this.surveySource.getValue());
  }

  private loadSurveyFromLocalStorage(): Survey | null {
    const surveyData = localStorage.getItem(this.localStorageKey);
    return surveyData ? JSON.parse(surveyData) : {
      titulo: 'Título del Survey',
      subtitulo: 'Subtítulo del Survey',
      preguntas: []
    };
  }

  private saveSurveyToLocalStorage(survey: Survey): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(survey));
  }

  public getSurveySnapshot(): Survey | null {
    return this.surveySource.getValue();
  }

  public updateSurvey(survey: Survey): void {
    this.saveSurveyToLocalStorage(survey);
    this.surveySource.next(survey);
  }

  public addQuestion(question: Pregunta): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas.push(question);
      this.updateSurvey(survey);
    }
  }

  public removeQuestion(index: number): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas.splice(index, 1);
      this.updateSurvey(survey);
    }
  }

  public addItem(questionIndex: number, item: Item): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items.push(item);
      this.updateSurvey(survey);
    }
  }

  public removeItem(questionIndex: number, itemIndex: number): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items.splice(itemIndex, 1);
      this.updateSurvey(survey);
    }
  }

  public editQuestion(index: number, updatedQuestion: Pregunta): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[index] = updatedQuestion;
      this.updateSurvey(survey);
    }
  }

  public editItem(questionIndex: number, itemIndex: number, updatedItem: Item): void {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items[itemIndex] = updatedItem;
      this.updateSurvey(survey);
    }
  }

  public moveQuestionUp(index: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && index > 0) {
      [survey.preguntas[index - 1], survey.preguntas[index]] =
        [survey.preguntas[index], survey.preguntas[index - 1]];
      this.updateSurvey(survey);
    }
  }

  public moveQuestionDown(index: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && index < survey.preguntas.length - 1) {
      [survey.preguntas[index + 1], survey.preguntas[index]] =
        [survey.preguntas[index], survey.preguntas[index + 1]];
      this.updateSurvey(survey);
    }
  }

  public moveItemUp(questionIndex: number, itemIndex: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && itemIndex > 0) {
      const items = survey.preguntas[questionIndex].items;
      [items[itemIndex - 1], items[itemIndex]] =
        [items[itemIndex], items[itemIndex - 1]];
      this.updateSurvey(survey);
    }
  }

  public moveItemDown(questionIndex: number, itemIndex: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && itemIndex < survey.preguntas[questionIndex].items.length - 1) {
      const items = survey.preguntas[questionIndex].items;
      [items[itemIndex + 1], items[itemIndex]] =
        [items[itemIndex], items[itemIndex + 1]];
      this.updateSurvey(survey);
    }
  }
}