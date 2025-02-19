import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import type { LinksFunction } from "react-router";

import styles from "./styles.css?url";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

interface UploadBtnProps {
  onFileSelect: (file: File | null | undefined) => void;
  disabled: boolean
}

export default function UploadBtn({ onFileSelect, disabled }: UploadBtnProps) {
  const [file, setFile] = useState<File | null | undefined>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const selectedFile = files ? files.item(0) : null;
    onFileSelect(selectedFile);
    setFile(selectedFile);
  }

  return (
    <Button
      disabled={disabled}
      size="small"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      sx={{ width: "fit-content", marginLeft: "auto" }}
    >
      {file?.name || "Escudo"}
      <input
        id="club-file-input"
        accept="image/png"
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
}
