import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  Date.now() + "_" + file.name.replaceAll(" ", "_");
        
        // Save to public/uploads directory
        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${filename}`;
        
        return NextResponse.json({ message: "Success", url: fileUrl }, { status: 201 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Error uploading file" }, { status: 500 });
    }
}
