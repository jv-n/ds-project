import { z } from 'zod';

export const File_Upload = z
    .instanceof(File)
    .refine(
        (file) => 
    [
        "application/pdf",
        "image/jpeg",
    ].includes(file.type),
    { message: "O arquivo deve ser um PDF ou uma imagem JPEG.", }
    )
    .refine(
        (file) => file.size <= 10 * 1024 * 1024,
        { message: "O arquivo deve ter no máximo 10MB." }
    );
