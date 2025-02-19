import type { MyIcon } from "~/types";

export type Titulo = {
  nome: string;
  conquistas: number;
};

export type Geocode = {
  lat: number;
  lng: number;
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
  local: string;
  country: string;
  geocode: Geocode;
};

export type ClubeInput = BaseClube & {
  localizacao: string;
  pais: string;
  geocode: Geocode;
  fileImg?: File | null
};


export const clubMap = new Map<string, Clube>([
  [
    "1",
    {
      id: "1",
      nome: "Real Madrid",
      tecnico: "Carlo Ancelotti",
      anoFundacao: 1902,
      icon: {
        url: "https://cdn.soccerwiki.org/images/logos/clubs/163.png",
        size: [30,30],
      },
      estadio: "Santiago Bernabeu",
      liga: "La Liga",
      local: "Madrid",
      country: "Spain",
      geocode: { lat: 40.45306, lng: -3.68835 },
      titulos: [
        { nome: "La Liga", conquistas: 34 },
        { nome: "Copa do Rei", conquistas: 19 },
        { nome: "Champions League", conquistas: 13 },
      ],
    },
  ],
  [
    "2",
    {
      id: "2",
      nome: "Barcelona",
      tecnico: "Xavi Hernandez",
      anoFundacao: 1899,
      icon: {
        url: "https://cdn.soccerwiki.org/images/logos/clubs/140.png",
        size: [30,30]
      },
      estadio: "Camp Nou",
      liga: "La Liga",
      local: "Barcelona",
      country: "Spain",
      geocode: { lat: 41.3809, lng: 2.12282 },
      titulos: [
        { nome: "La Liga", conquistas: 26 },
        { nome: "Copa do Rei", conquistas: 31 },
        { nome: "Champions League", conquistas: 5 },
      ],
    },
  ],
  [
    "3",
    {
      id: "3",
      nome: "Manchester United",
      tecnico: "Erik ten Hag",
      anoFundacao: 1878,
      icon: {
        url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
        size: [30,30]
      },
      estadio: "Old Trafford",
      liga: "Premier League",
      local: "Manchester",
      country: "England",
      geocode: { lat: 53.4631, lng: -2.29139 },
      titulos: [
        { nome: "Premier League", conquistas: 20 },
        { nome: "FA Cup", conquistas: 12 },
        { nome: "Champions League", conquistas: 3 },
      ],
    },
  ],
  [
    "4",
    {
      id: "4",
      nome: "Bayern Munich",
      tecnico: "Julian Nagelsmann",
      anoFundacao: 1900,
      estadio: "Allianz Arena",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      liga: "Bundesliga",
      local: "Munich",
      country: "Germany",
      geocode: { lat: 48.2188, lng: 11.6247 },
      titulos: [
        { nome: "Bundesliga", conquistas: 31 },
        { nome: "DFB-Pokal", conquistas: 20 },
        { nome: "Champions League", conquistas: 6 },
      ],
    },
  ],
  [
    "5",
    {
      id: "5",
      nome: "Juventus",
      tecnico: "Massimiliano Allegri",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      anoFundacao: 1897,
      estadio: "Allianz Stadium",
      liga: "Serie A",
      local: "Turin",
      country: "Itália",
      geocode: { lat: 45.1096, lng: 7.6413 },
      titulos: [
        { nome: "Serie A", conquistas: 36 },
        { nome: "Coppa Italia", conquistas: 14 },
        { nome: "Champions League", conquistas: 2 },
      ],
    },
  ],
  [
    "6",
    {
      id: "6",
      nome: "Paris Saint-Germain",
      tecnico: "Mauricio Pochettino",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      anoFundacao: 1970,
      estadio: "Parc des Princes",
      liga: "Ligue 1",
      local: "Paris",
      country: "França",
      geocode: { lat: 48.8414, lng: 2.253 },
      titulos: [
        { nome: "Ligue 1", conquistas: 9 },
        { nome: "Coupe de France", conquistas: 14 },
        { nome: "Champions League", conquistas: 0 },
      ],
    },
  ],
  [
    "7",
    {
      id: "7",
      nome: "Liverpool",
      tecnico: "Jurgen Klopp",
      anoFundacao: 1892,
      estadio: "Anfield",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      liga: "Premier League",
      local: "Liverpool",
      country: "Inglaterra",
      geocode: { lat: 53.4308, lng: -2.9608 },
      titulos: [
        { nome: "Premier League", conquistas: 19 },
        { nome: "FA Cup", conquistas: 7 },
        { nome: "Champions League", conquistas: 6 },
      ],
    },
  ],
  [
    "8",
    {
      id: "8",
      nome: "Chelsea",
      tecnico: "Thomas Tuchel",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      anoFundacao: 1905,
      estadio: "Stamford Bridge",
      liga: "Premier League",
      local: "London",
      country: "Inglaterra",
      geocode: { lat: 51.4817, lng: -0.191 },
      titulos: [
        { nome: "Premier League", conquistas: 6 },
        { nome: "FA Cup", conquistas: 8 },
        { nome: "Champions League", conquistas: 2 },
      ],
    },
  ],
  [
    "9",
    {
      id: "9",
      nome: "AC Milan",
      tecnico: "Stefano Pioli",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      anoFundacao: 1899,
      estadio: "San Siro",
      liga: "Serie A",
      local: "Milan",
      country: "Itália",
      geocode: { lat: 45.4781, lng: 9.124 },
      titulos: [
        { nome: "Serie A", conquistas: 18 },
        { nome: "Coppa Italia", conquistas: 5 },
        { nome: "Champions League", conquistas: 7 },
      ],
    },
  ],
  [
    "10",
    {
      id: "10",
      nome: "Inter Milan",
      tecnico: "Simone Inzaghi",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      anoFundacao: 1908,
      estadio: "San Siro",
      liga: "Serie A",
      local: "Milan",
      country: "Itália",
      geocode: { lat: 45.4781, lng: 9.124 },
      titulos: [
        { nome: "Serie A", conquistas: 19 },
        { nome: "Coppa Italia", conquistas: 7 },
        { nome: "Champions League", conquistas: 3 },
      ],
    },
  ],
  [
    "11",
    {
      id: "11",
      nome: "Ajax",
      tecnico: "Erik ten Hag",
      anoFundacao: 1900,
      estadio: "Johan Cruyff Arena",
      icon: {
      url: "https://cdn.soccerwiki.org/images/logos/clubs/49.png",
      size: [30,30]
      },
      liga: "Eredivisie",
      local: "Amsterdam",
      country: "Holanda",
      geocode: { lat: 52.3142, lng: 4.941 },
      titulos: [
        { nome: "Eredivisie", conquistas: 35 },
        { nome: "KNVB Cup", conquistas: 20 },
        { nome: "Champions League", conquistas: 4 },
      ],
    },
  ],
]);

// Simulate fetching all clubs
export const fetchAllClubs = (): Promise<Clube[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(clubMap.values()));
    }, Math.random() * 1000);
  });
};

// Simulate fetching a club by ID
export const fetchClubById = (id: string): Promise<Clube | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clubMap.get(id));
    }, Math.random() * 1000);
  });
};

// Simulate adding a new club
export const addClub = (club: Clube): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      clubMap.set(club.id, club);
      resolve();
    }, Math.random() * 1000);
  });
};

// Simulate updating an existing club
export const updateClub = (
  id: string,
  updatedClub: Partial<Clube>
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const club = clubMap.get(id);
      if (club) {
        const newClub = { ...club, ...updatedClub };
        clubMap.set(id, newClub);
      }
      resolve();
    }, Math.random() * 1000);
  });
};

// Simulate deleting a club
export const deleteClub = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      clubMap.delete(id);
      resolve();
    }, Math.random() * 1000);
  });
};
