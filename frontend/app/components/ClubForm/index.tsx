import { useState } from "react";
import type { LinksFunction } from "react-router";
import {
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import type { Titulo } from "~/types";

import styles from "./styles.css?url";
import { AddCircle, Delete } from "@mui/icons-material";
import type {  ClubeInput } from "~/utils/mockData";
import UploadBtn, {links as uploadBtnLinks} from "./UploadBtn";

export const links: LinksFunction = () => [...uploadBtnLinks(), { rel: "stylesheet", href: styles }];

export interface Props {
  defaultClube?: ClubeInput;
  handleSubmit: (clube: ClubeInput) => any;
  disabled: boolean
}

export default function ClubeForm({ defaultClube, handleSubmit, disabled }: Props) {
  const [clube, setClube] = useState(
    defaultClube || {
      nome: "",
      tecnico: "",
      anoFundacao: 2000,
      estadio: "",
      liga: "",
      fileImg: null,
      titulos: [] as Titulo[],
    }
  );

  const handleChange = (key: string, val: any) => {
    setClube((prev) => ({ ...prev, [key]: val }));
  };

  const handleTitleChange = (key: string, val: any, index: number) => {
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
      titulos: [...prev.titulos, { nome: "", conquistas: 1 }],
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
        onFileSelect={(val: any) => handleChange("picture", val.value)}
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
              value={field.conquistas}
              onChange={(e) => handleTitleChange("conquistas", e.target.value, index)}
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
        onClick={() => handleSubmit({...clube, geocode: {lat: 0, lng: 0}, localizacao: "", pais: ""})}
      >
        Salvar
      </Button>
    </Box>
  );
}
