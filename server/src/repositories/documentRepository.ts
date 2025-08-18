import path from 'path';
import { Express } from 'express';
import fs from 'fs';
import { Documento } from '@prisma/client';
import prisma from '../database';



class DocumentRepository {
    // Use a consistent upload folder relative to project root
    private uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

    constructor() {
        // Ensure upload directory exists
        this.ensureUploadDirectoryExists();
    }

    private ensureUploadDirectoryExists(): void {
        if (!fs.existsSync(this.uploadFolder)) {
            fs.mkdirSync(this.uploadFolder, { recursive: true });
            console.log(`📁 Upload directory created: ${this.uploadFolder}`);
        }
    }

    async uploadFile(file: Express.Multer.File, filename?: string): Promise<Documento> {
        const { originalname, mimetype, size } = file;
        const storedName = filename || `${Date.now().toString()}-${originalname}`;
        const filePath = path.join(this.uploadFolder, storedName);

        // Save file info to database
        const savedFile = await prisma.documento.create({
            data: {
                storedName,
                mimetype,
                size,
                path: filePath
            },
        });

        console.log(`📄 File uploaded: ${storedName}`);
        return savedFile;
    }

    async deleteFile(storedName: string, id: string): Promise<void> {
        const filePath = path.join(this.uploadFolder, storedName);
        
        try {
            // Delete the file from the filesystem if it exists
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`🗑️ File deleted from filesystem: ${storedName}`);
            }

            // Remove the file info from the database
            await prisma.documento.delete({
                where: { id },
            });
            
            console.log(`🗑️ File record deleted from database: ${id}`);
        } catch (error) {
            console.error(`❌ Error deleting file: ${storedName}`, error);
            throw error;
        }
    }

    async getFilePath(storedName: string): Promise<string> {
        return path.join(this.uploadFolder, storedName);
    }

    async fileExists(storedName: string): Promise<boolean> {
        const filePath = path.join(this.uploadFolder, storedName);
        return fs.existsSync(filePath);
    }
}

export default new DocumentRepository();