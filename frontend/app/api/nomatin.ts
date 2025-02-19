import axios from "axios";

export async function querySearch(query: string): Promise<[number, number] | undefined> {
  try {
    query = query.replaceAll(" ", "+")
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    const data = await resp.json();
    if (data.length === 0) return;
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch(error) {
    return undefined
  }
}

interface Location {
  pais: string;
  nomeLocalizacao: string;
}

export async function getLocationByCoordenates(lat: number, lon: number): Promise<Location | undefined> {
  try {
    let {data} = await axios(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=geojson`)
    if (!data || data.error) return;
    data = data.features[0].properties.address
    return {pais: data.country, nomeLocalizacao: data.town || data.state}
  } catch(erro) {
    console.log(erro)
    return undefined
  }
}
