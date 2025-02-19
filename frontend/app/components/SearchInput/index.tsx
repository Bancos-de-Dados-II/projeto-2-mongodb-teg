import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import type { LinksFunction } from 'react-router';

import styles from "./styles.css?url";
import { useState } from 'react';
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export interface Props {
  handleSelection: (text: string) => any;
  disable: boolean;
}

export default function SearchInput({ handleSelection, disable }: Props) {
  const [value, setValue] = useState("");

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%" }}
    >
      <InputBase
        size='small'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inputProps={{ 'aria-label': 'searc' }}
        disabled={disable}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {handleSelection(value); setValue("")}} disabled={disable}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
