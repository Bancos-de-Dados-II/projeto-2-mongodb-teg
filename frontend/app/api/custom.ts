import axios from "axios";
import type { Clube, ClubeInput } from "~/types";

export async function getAllClubes(): Promise<Clube[]> {
  try {
    const resp = await fetch("http://localhost:3000/clubes");
    let data: Clube[] = await resp.json();
    data.map((val) => {
      // @ts-ignore
      const [longitude, latitude] = val.geocode.coordinates;
      val.geocode = [latitude, longitude];
      // @ts-ignore
      val.id = val._id;
      // @ts-ignore
      val._id = undefined;
    });
    return data;
  } catch (err) {
    return [];
  }
}

export async function getClubById(id: string): Promise<Clube | undefined> {
  try {
    const resp = await fetch("http://localhost:3000/clubes/" + id);
    let data = await resp.json();
    const [longitude, latitude] = data.geocode.coordinates;
    data.geocode = [latitude, longitude];
    // @ts-ignore
    data.id = data._id;
    // @ts-ignore
    data._id = undefined;
    return data;
  } catch (err) {
    console.log(err)
    return undefined;
  }
}

export async function deleteClubById(id: string): Promise<boolean> {
  try {
    const resp = await fetch(`http://localhost:3000/clubes/${id}`, {
      method: "DELETE",
    })
    if (!resp.ok) return false;
    return true;
  } catch (err) {
    return false;
  }
}

export async function insertClubWithFile(club: ClubeInput): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('nome', club.nome);
    formData.append('liga', club.liga);
    formData.append('anoFundacao', club.anoFundacao.toString());
    formData.append('estadio', club.estadio);
    formData.append('nomeLocalizacao', club.nomeLocalizacao);
    formData.append('pais', club.pais);
    formData.append('tecnico', club.tecnico);

    if (club.file) formData.append('file', club.file);

    club.titulos.forEach((titulo, index) => {
      formData.append(`titulos[${index}][nome]`, titulo.nome);
      formData.append(`titulos[${index}][numeroVezesVenceu]`, titulo.numeroVezesVenceu.toString());
    });

    formData.append("geocode", JSON.stringify({
      type: "Point",
      coordinates: [club.geocode[0], club.geocode[1]]
    }))

    const response = await fetch('http://localhost:3000/clubes', {
      method: 'POST',
      body: formData
    });

    return response.ok;
  } catch (error) {
    console.error('Error inserting club:', error);
    return false;
  }
}

export async function updateClub(club: Omit<ClubeInput, "id" | "_id">, id: string): Promise<any | undefined> {
  try {
    const coords = club.geocode;

    // @ts-ignore
    club.geocode = {
      type: "Point",
      coordinates: [coords[1], coords[0]],
    };
    const { data } = await axios.put(`http://localhost:3000/clubes/${id}`, club);
    if (!data) return;
    data.id = data._id;
    const [longitude, latitude] = data.geocode.coordinates;
    data.geocode = [latitude, longitude];
    return data;
  } catch (err) {
    return undefined;
  }
}

export async function insertClub(club: ClubeInput): Promise<any | undefined> {
  try {

    const coords = club.geocode

    // @ts-ignore
    club.geocode = {
      type: "Point",
      coordinates: [coords[1], coords[0]],
    }


    const {data} = await axios.post("http://localhost:3000/clubes", club)
    if (!data) return;
    data.id = data._id
    const [longitude, latitude] = data.geocode.coordinates;
    data.geocode = [latitude, longitude];
    return data;
  } catch(err) {
    return 
  }
}
