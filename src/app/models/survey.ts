export interface Survey{
    titulo: string;
    subtitulo: string;
}

interface Item {
    titulo: string;
    type: string;
  }

interface Pregunta {
    titulo: string;
    subtitulo: string;
    items: Item[]; 
  }