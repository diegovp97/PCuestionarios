export interface Survey{
    titulo: string;
    subtitulo: string;
}

export interface Item {
    titulo: string;
    type: string;
  }

export interface Pregunta {
    titulo: string;
    subtitulo: string;
    items: Item[]; 
  }