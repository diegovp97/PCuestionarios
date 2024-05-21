import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item/item.component';
import { SurveyComponent } from './survey/survey/survey.component';
import { QuestionComponent } from './question/question/question.component';
import { SurveyService } from './services/survey.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ItemComponent,SurveyComponent,QuestionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PCuestionarios';
}
