import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {

  survey_model: Survey | null;

  constructor() { 
    this.survey_model = null;
  }
}

