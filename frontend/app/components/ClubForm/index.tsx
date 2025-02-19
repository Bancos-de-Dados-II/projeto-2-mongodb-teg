import { useEffect, useState } from "react";
import type { LinksFunction } from "react-router";
import {
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import type { ClubeInput } from "~/types";
import type { Titulo } from "~/types";
import UploadBtn, {links as uploadBtnLinks} from "./UploadBtn";

import styles from "./styles.css?url";
export const links: LinksFunction = () => [...uploadBtnLinks(), { rel: "stylesheet", href: styles }];

export interface Props {
  defaultClube?: ClubeInput;
  handleSubmit: (clube: ClubeInput) => any | Promise<any>;
  disabled: boolean
}

export default function ClubeForm({ defaultClube, handleSubmit, disabled }: Props) {
  const [clube, setClube] = useState<ClubeInput>(
    defaultClube || {
      nome: "",
      tecnico: "",
      anoFundacao: 2000,
      estadio: "",
      liga: "",
      file: undefined,
      titulos: [] as Titulo[],
    }
  );

  function handleChange(key: string, val: any) {
    setClube((prev) => ({ ...prev, [key]: val }));
  }

  function handleTitleChange(key: string, val: any, index: number) {
    setClube((prev) => ({
      ...prev,
      titulos: prev.titulos.map((item, i) =>
        i === index ? { ...item, [key]: val } : item
      ),
    }));
  }

  function addTitle() {
    setClube((prev) => ({
      ...prev,
      titulos: [...prev.titulos, { nome: "", numeroVezesVenceu: 1 }],
    }));
  }

  function removeTitle(index: number) {
    setClube((prev) => ({
      ...prev,
      titulos: prev.titulos.filter((_, i) => i !== index),
    }));
  }

  return (
    <Box
      component="form"
      className="clube-form"
    >
      <TextField
        label="Nome"
        name="nome"
        value={clube.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
        fullWidth
        required
        className="form-input"
        disabled={disabled}
      />
      <TextField
        label="Técnico"
        name="tecnico"
        value={clube.tecnico}
        onChange={(e)=> handleChange("tecnico", e.target.value)}
        fullWidth
        required
        className="form-input"
        disabled={disabled}
      />
      <TextField
        label="Ano de Fundação"
        name="anoFundacao"
        type="number"
        value={clube.anoFundacao}
        onChange={(e)=> handleChange("anoFundacao", e.target.value)}
        fullWidth
        required
        className="form-input"
        disabled={disabled}
      />
      <TextField
        label="Estádio"
        name="estadio"
        value={clube.estadio}
        onChange={(e)=> handleChange("estadio", e.target.value)}
        fullWidth
        required
        className="form-input"
        disabled={disabled}
      />

      <TextField
        label="Liga"
        name="liga"
        value={clube.liga}
        onChange={(e)=> handleChange("liga", e.target.value)}
        fullWidth
        required
        className="form-input"
        disabled={disabled}
      />

      <UploadBtn
        onFileSelect={(val: any) =>  { handleChange("file", val)}}
        disabled={disabled}
      />

      <p className="titulos-label">Títulos</p>
      <div className="club-edit-form-titulosdiv">
        {clube.titulos.map((field, index) => (
          <div className="club-edit-form-titulofield" key={index}>
            <TextField
              value={field.nome}
              id="titulo-name"
              onChange={(e) => handleTitleChange("nome", e.target.value, index)}
              label="Nome"
              variant="standard"
              size="small"
              className="titulo-field-name"
              disabled={disabled}
            />

            <TextField
              id="titulo-number"
              value={field.numeroVezesVenceu}
              onChange={(e) => handleTitleChange("numeroVezesVenceu", e.target.value, index)}
              variant="standard"
              size="small"
              type="number"
              slotProps={{
                htmlInput: { min: 0, style: { textAlign: "center" } },
              }}
              placeholder="1"
              className="titulo-field-number"
              disabled={disabled}
            />

            <IconButton
              aria-label="delete"
              size="small"
              className="titulo-field-trash"
        disabled={disabled}
              onClick={() => {
                removeTitle(index);
              }}
            >
              <Delete color="primary" />
            </IconButton>
          </div>
        ))}

        <IconButton
          aria-label="add"
          size="medium"
          onClick={addTitle}
          className="titulo-field-add"
          disabled={disabled}
        >
          <AddCircle color="primary" />
        </IconButton>
      </div>

      <Button
        variant="contained"
        className="form-button"
        disabled={disabled}
        onClick={() => {
          handleSubmit(clube)
        }}
      >
        Salvar
      </Button>
    </Box>
  );
}
