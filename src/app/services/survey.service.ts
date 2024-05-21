import {Injectable} from '@angular/core';
import {Survey, Pregunta, Item} from '../models/survey';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  public survey_model: Survey | null;
  public surveySubject = new BehaviorSubject<Survey | null>(null);
  public surveySource = new BehaviorSubject<Survey | null>({
    titulo: 'Título del Survey',
    subtitulo: 'Subtítulo del Survey',
    preguntas: []
  });
  survey$ = this.surveySource.asObservable();

  constructor() {
    this.survey_model = {
      titulo: 'Título del Survey',
      subtitulo: 'Subtítulo del Survey',
      preguntas: []
    };
    this.surveySource.next(this.survey_model);
  }

  public getSurveySnapshot(): Survey | null {
    return this.surveySource.getValue();
  }

  updateSurvey(survey: Survey) {
    this.survey_model = survey;
    this.surveySource.next(survey);
  }

  addQuestion(question: Pregunta) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas.push(question);
      this.updateSurvey(survey);
    }
  }

  removeQuestion(index: number) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas.splice(index, 1);
      this.updateSurvey(survey);
    }
  }

  addItem(questionIndex: number, item: Item) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items.push(item);
      this.updateSurvey(survey);
    }
  }

  removeItem(questionIndex: number, itemIndex: number) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items.splice(itemIndex, 1);
      this.updateSurvey(survey);
    }
  }

  editQuestion(index: number, updatedQuestion: Pregunta) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[index] = updatedQuestion;
      this.updateSurvey(survey);
    }
  }

  editItem(questionIndex: number, itemIndex: number, updatedItem: Item) {
    const survey = this.getSurveySnapshot();
    if (survey) {
      survey.preguntas[questionIndex].items[itemIndex] = updatedItem;
      this.updateSurvey(survey);
    }
  }

  moveQuestionUp(index: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && index > 0) {
      [survey.preguntas[index - 1], survey.preguntas[index]] =
        [survey.preguntas[index], survey.preguntas[index - 1]];
      this.updateSurvey(survey);
    }
  }

  moveQuestionDown(index: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && index < survey.preguntas.length - 1) {
      [survey.preguntas[index + 1], survey.preguntas[index]] =
        [survey.preguntas[index], survey.preguntas[index + 1]];
      this.updateSurvey(survey);
    }
  }

  moveItemUp(questionIndex: number, itemIndex: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && itemIndex > 0) {
      const items = survey.preguntas[questionIndex].items;
      [items[itemIndex - 1], items[itemIndex]] =
        [items[itemIndex], items[itemIndex - 1]];
      this.updateSurvey(survey);
    }
  }

  moveItemDown(questionIndex: number, itemIndex: number): void {
    const survey = this.getSurveySnapshot();
    if (survey && itemIndex < survey.preguntas[questionIndex].items.length - 1) {
      const items = survey.preguntas[questionIndex].items;
      [items[itemIndex + 1], items[itemIndex]] =
        [items[itemIndex], items[itemIndex + 1]];
      this.updateSurvey(survey);
    }
  }
}