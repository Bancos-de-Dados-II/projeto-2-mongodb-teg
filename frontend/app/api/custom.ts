import type { Clube } from "~/types";

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
