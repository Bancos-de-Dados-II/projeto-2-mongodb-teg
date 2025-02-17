import { useState } from "react";
import type { LinksFunction } from "react-router";
import { Autocomplete, createFilterOptions } from "@mui/material";
import CustomInputComponent from "./CustomInput";

import styles from "./styles.css?url";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export interface SearchInputProps<T> {
  data: T[];
  property: keyof T;
  handleSelection: (obj: T | string) => any;
}

export default function SearchInput<T>({ 
  data,
  property,
  handleSelection,
  }: SearchInputProps<T>) {
  const [value, setValue] = useState<string>("");

  const filter = createFilterOptions<T>({
    limit: 50,
    matchFrom: "start",
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
  });

  const getLabel = (option: T | string): string => {
    if (typeof option === "string") return option;
    return option[property] as string;
  };

  return (
    <Autocomplete
      id="size-small-standard"
      className="search-input-container"
      value={value}
      onInputChange={(_, val) => setValue(val)}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "70%",
        maxWidth: 500,
      }}
      onChange={(_, newValue) => {
        setValue("");
        handleSelection(newValue || "");
      }}
      filterOptions={(options, params) => {
        if (params.inputValue.length === 0) return []
        return filter(options, params)}
      }
      options={data}
      getOptionLabel={(option) => getLabel(option)}
      renderOption={(props, option: T, state) => {
        return <li {...props} key={state.index}>{getLabel(option)}</li>;
      }}
      freeSolo
      renderInput={(params) => <CustomInputComponent params={params} />}
    />
  );
}
