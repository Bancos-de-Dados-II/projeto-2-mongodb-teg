import type { CountryWithFlag } from "~/types";

export async function getAllCountries(): Promise<string[]> {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode");

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data: {data: CountryWithFlag[]} = await response.json();

  return data.data.map(({ name, unicodeFlag }) => `${unicodeFlag} ${name}`);
}

export async function getCitiesByCountry(country: string): Promise<string[]> {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ country }),
    }
  );

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data: {data: string[]} = await response.json();
  return data.data;
}
