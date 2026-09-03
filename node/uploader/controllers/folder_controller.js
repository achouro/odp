const prisma = require('../config/database');

async function create_folder(request, response, next) {
    try {
        const { name } = request.body;
        if (!name) { 
            return response.status(400).json({ error: 'Folder name is required' }); 
        }

        const folder = await prisma.folder.create({
            data: { 
                name, 
                user_id: request.user.id 
            },
        });

        return response.status(201).json(folder);
    } catch (error) {
        return next(error);
    }
}

async function get_folder(request, response, next) {
    try {
        const folder = await prisma.folder.findFirst({
            where: { id: request.params.id, user_id: request.user.id },
            include: { files: true },
        });

        if (!folder) { 
            return response.status(404).json({ error: 'Folder not found.' }); 
        }
        
        return response.json(folder);
    } catch (error) {
        return next(error);
    }
}

async function update_folder(request, response, next) {
    try {
        const { name } = request.body;
        if (!name) {
            return response.status(400).json({ error: 'New folder name is required' });
        }

        const result = await prisma.folder.updateMany({
            where: { id: request.params.id, user_id: request.user.id },
            data: { name }
        });

        if (result.count === 0) { 
            return response.status(404).json({ error: 'Folder not found or unauthorized' });
        }

        return response.json({ message: 'Folder updated successfully' });
    } catch (error) {
        return next(error);
    }
}

async function delete_folder(request, response, next) {
    try {
        const result = await prisma.folder.deleteMany({
            where: { id: request.params.id, user_id: request.user.id }
        });

        if (result.count === 0) { 
            return response.status(404).json({ error: 'Folder not found or unauthorized' });
        }

        //return response.json({ message: 'Folder content deleted successfully.' });
        return response.redirect('/dashboard');
    } catch (error) {
        return next(error);
    }
}

async function get_folders(request, response, next) {
    try {
        const folders = await prisma.folder.findMany({
            where: { user_id: request.user.id },
            include: { files: true }
        });

        return response.render('folders/index', { folders, user: request.user });
    } catch (error) {
        return next(error);
    }
}

async function get_dashboard(request, response, next) {
    try {
        const folder_id = request.query.folder_id || null;

        let current_folder = null;
        if (folder_id) {
            current_folder = await prisma.folder.findFirst({
                where: { id: folder_id, user_id: request.user.id }
            });
        }

        const folders = await prisma.folder.findMany({
            where: { user_id: request.user.id },
            orderBy: { createdAt: 'desc' }
        });

        const files = await prisma.file.findMany({
            where: { 
                user_id: request.user.id,
                folder_id: folder_id
            },
            orderBy: { createdAt: 'desc' }
        });

        return response.render('dashboard', {
            user: request.user,
            current_folder,
            folders,
            files
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = { 
    create_folder, 
    get_folder, 
    update_folder, 
    delete_folder, 
    get_folders,
    get_dashboard,
};