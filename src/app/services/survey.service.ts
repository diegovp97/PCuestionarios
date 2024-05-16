import {Injectable} from '@angular/core';
import {Survey} from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  survey_model: Survey | null = null; // Survey model

  constructor() {

  }
}

