import multer from "multer";

 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
        cb(null, __dirname + "/public");
    },
});

 

export const uploader = multer({ storage });

 

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);