export type CountryWithFlag = {
  name: string;
  unicodeFlag: string;
};

export type MyIcon = {
  url: string;
  size: [number, number];
};

export type Titulo = {
  nome: string;
  numeroVezesVenceu: number;
};

export type BaseClube = {
  nome: string;
  tecnico: string;
  anoFundacao: number;
  estadio: string;
  liga: string;
  titulos: Titulo[];
};

export type Clube = BaseClube & {
  id: string;
  icon: MyIcon;
  imageurl: string
  geocode: [number, number];
  nomeLocalizacao: string;
  pais: string
  rivais: string[]
};

export type ClubeInput = Omit<Clube, 'id' | 'icon' > & {
  fileImg?: File | null;
  imageurl?: string
};

