import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { SurveyService } from '../../services/survey.service';
import { Pregunta, Item, ItemType } from '../../models/survey';
import { ItemComponent } from '../../item/item/item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as YAML from 'js-yaml';
import { marked } from 'marked';  // Importa 'marked' directamente
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ItemComponent, FormsModule, CommonModule, AngularEditorModule, MarkdownModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() pregunta!: Pregunta;
  @Input() index!: number;
  @Output() questionUpdated = new EventEmitter<void>();
  editing = false;

  selectedFormat: 'xml' | 'yaml' | 'markdown' = 'xml';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      }
    ]
  };

  constructor(private surveyService: SurveyService, private sanitizer: DomSanitizer, http:HttpClient) {}

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  async saveQuestion(): Promise<void> {
    this.pregunta.titulo = await this.convertContent(this.pregunta.titulo, this.selectedFormat);
    this.editing = false;
    this.questionUpdated.emit();
  }

  deleteQuestion(): void {
    this.surveyService.removeQuestion(this.index);
    this.questionUpdated.emit();
  }

  addItem(type: ItemType): void {
    const newItem: Item = {
      titulo: `Nuevo Ítem ${type}`,
      type: type
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

  async convertContent(content: string, format: 'xml' | 'yaml' | 'markdown'): Promise<string> {
    switch (format) {
      case 'xml':
        return `<pre>${content}</pre>`;
      case 'yaml':
        try {
          const parsedYaml = YAML.load(content);
          return `<pre>${YAML.dump(parsedYaml)}</pre>`;
        } catch (error) {
          console.error('Error al analizar YAML:', error);
          return `<pre>${content}</pre>`;
        }
      case 'markdown':
        return marked(content);
      default:
        return content;
    }
  }

  getSafeHtml(content: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  isMarkdown(content: string): boolean {
    return this.selectedFormat === 'markdown';
  }
}
