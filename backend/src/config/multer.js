import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pasta = path.join(__dirname, "../uploads");

if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
    console.log(`Pasta "${pasta}" criada com sucesso!`);
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, pasta);

    },
    filename: (req, file, callback)=>{
        const tempo = new Date().getTime();

        callback(null, `${tempo}_${file.originalname}`);
    }
})

const upload = multer({storage: storage});

export {upload};

