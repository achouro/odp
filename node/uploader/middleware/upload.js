const multer = require('multer');
const supabase = require('../config/supabase');

const allowed_mime_types = [
    'image/jpeg', 
    'image/png', 
    'application/pdf', 
    'text/plain', 
    'application/zip',
    'application/x-zip-compressed',
    'text/javascript',       // For .js files
    'application/javascript', // For .js files
    'application/x-javascript',
    'text/x-python',         // For .py files
    'application/x-python-code',
    'text/x-python-script'
];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 4.5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (!allowed_mime_types.includes(file.mimetype)) {
            return cb(new Error(`Invalid file type: ${file.mimetype}. Only JPG, PNG, PDF, TXT, and ZIP are allowed.`));
        }
        cb(null, true);
    }
});

async function uploadToSupabase(file, user_id) {
    const bucket = process.env.SUPABASE_BUCKET_NAME || 'uploads';
    const storage_path = `${user_id}/${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(storage_path, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(storage_path);

    return { 
        path: storage_path, 
        public_url: publicUrlData.publicUrl 
    };
}

module.exports = { upload, uploadToSupabase };