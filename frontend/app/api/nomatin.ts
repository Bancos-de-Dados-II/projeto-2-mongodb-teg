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
