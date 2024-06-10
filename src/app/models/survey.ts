export interface Survey {
  titulo: string;
  subtitulo: string;
  preguntas: Pregunta[];
}

export interface Item {
  titulo: string;
  type: 'text' | 'numeric' | 'selection';
  options?: string[];
}

export interface Pregunta {
  titulo: string;
  subtitulo: string;
  items: Item[];
}

export type ItemType = 'numeric' | 'text' | 'selection';