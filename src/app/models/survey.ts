export interface Survey{
    titulo: string;
    subtitulo: string;
}

interface Item {
    title: string;
    type: string;
  }

interface Pregunta {
    title: string;
    subtitle: string;
    items: Item[]; 
  }