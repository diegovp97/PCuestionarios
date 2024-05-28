export interface Survey {
  titulo: string;
  subtitulo: string;
  preguntas: Pregunta[];
}

export interface Item {
  titulo: string;
  type: 'text' | 'number' | 'selection';
  options?: string[];
}

export interface Pregunta {
  titulo: string;
  subtitulo: string;
  items: Item[];
}

export type ItemType = 'number' | 'text' | 'selection';