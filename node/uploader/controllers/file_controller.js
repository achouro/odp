const prisma = require('../config/database');
const supabase = require('../config/supabase');
const { uploadToSupabase } = require('../middleware/upload');

async function upload_file(request, response, next) {
    try {
        if (!request.file) {
            return response.status(400).json({ error: 'No file provided.' });
        }

        const folder_id = 
              (request.body.folder_id && request.body.folder_id.trim() !== '') 
              ? request.body.folder_id 
              : null;
        
        const { path, public_url } = await uploadToSupabase(request.file, request.user.id);
        
         await prisma.file.create({
            data: {
                name: request.body.custom_name || request.file.originalname,
                original_name: request.file.originalname, // Fixed Multer property
                size: request.file.size,
                mime_type: request.file.mimetype,
                url: public_url,
                user_id: request.user.id,
                folder_id: folder_id
            }
        });

        //return response.status(201).json(new_file);
        const redirect_url = folder_id ? `/dashboard?folder_id=${folder_id}` : '/dashboard';
        return response.redirect(redirect_url);
    } catch (error) {
        return next(error);
    }
}

async function get_file_details(request, response, next) {
    try {
        const file = await prisma.file.findFirst({
            where: { id: request.params.id, user_id: request.user.id }
        });
        
        if (!file) { 
            return response.status(404).json({ error: 'File not found' }); 
        }

        const file_details = {
            id: file.id,
            name: file.name,
            original_name: file.original_name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            mime_type: file.mime_type,
            uploaded_at: file.createdAt, // Fixed to match schema.prisma (createdAt)
            download_url: `/api/files/${file.id}/download`
        };

        return response.json(file_details);
    } catch (error) {
        return next(error);
    }
}

async function download_file(request, response, next) {
    try {
        const file = await prisma.file.findFirst({
            where: { id: request.params.id, user_id: request.user.id } // Fixed userId -> user_id
        });

        if (!file) {
            return response.status(404).json({ error: 'File not found' });
        }

        const bucket = process.env.SUPABASE_BUCKET_NAME || 'uploads';

        const url=file.url.split(`/storage/v1/object/public/${bucket}`)
        const storage_path=url.length>1 ? decodeURIComponent(url[1]) : file.name;

        const {data, error}=await supabase.storage.from(bucket).createSignedUrl(storage_path, 60, {download: file.original_name});

        if(error){throw error;}
        return response.redirect(data.signedUrl);

    } catch (error) {
        return next(error);
    }
}

async function delete_file(request, response, next) {
    try {
        const file = await prisma.file.findFirst({
            where: { id: request.params.id, user_id: request.user.id } // Fixed userId -> user_id
        });

        if (!file) {
            return response.status(404).json({ error: 'File not found' });
        }

        const folder_id=file.folder_id

        // Extract Supabase storage path from saved URL
        const bucket = process.env.SUPABASE_BUCKET_NAME || 'uploads';
        const storagePath = file.url.split(`${bucket}/`)[1];

        if (storagePath) {
            await supabase.storage.from(bucket).remove([storagePath]);
        }

        await prisma.file.delete({ where: { id: file.id } });

        //return response.json({ message: 'File deleted successfully' });
        const redirect_url = folder_id ? `/dashboard?folder_id=${folder_id}` : '/dashboard';
        
        return response.redirect('/dashboard');
    } catch (error) {
        return next(error);
    }
}



module.exports = { upload_file, get_file_details, download_file, delete_file };