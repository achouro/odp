const db = require('../database/queries');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function item_list(request, response, next) {
  try {
    const items = await db.get_all_items();
    response.render('items/index', { title: 'All items', items });
  } catch (error) {
    next(error);
  }
}

async function item_detail(request, response, next) {
  try {
    const id = parseInt(request.params.id, 10);

    if (isNaN(id)) {
      return response.status(404).render('404', { message: `Invalid item ID: ${request.params.id}` });
    }

    const item = await db.get_item_by_id(id);

    if (!item) {
      return response.status(404).render('404', { message: `Item not found with ID ${id}` });
    }

    response.render('items/detail', { title: 'Item Details', item });
  } catch (error) {
    next(error);
  }
}

async function item_create_get(request, response, next) {
  try {
    const categories = await db.get_all_categories();
    response.render('items/form', { 
      title: 'Create item', 
      item: {}, 
      categories, 
      error_message: null 
    });
  } catch (error) {
    next(error);
  }
}

async function item_create_post(request, response, next) {
  try {
    await db.create_item(request.body);
    response.redirect('/items');
  } catch (error) {
    next(error);
  }
}

async function item_update_get(request, response, next) {
  try {
    const id = parseInt(request.params.id, 10);

    if (isNaN(id)) {
      return response.status(404).render('404', { message: `Invalid item ID: ${request.params.id}` });
    }

    const [item, categories] = await Promise.all([
      db.get_item_by_id(id),
      db.get_all_categories()
    ]);

    if (!item) {
      return response.status(404).render('404', { message: 'Item not found' });
    }

    response.render('items/form', {
      title: 'Edit item',
      item,
      categories,
      error_message: null
    });
  } catch (error) {
    next(error);
  }
}

async function item_update_post(request, response, next) {
  try {
    const id = parseInt(request.params.id, 10);
    const { name, description, price, stock, category_id, admin_password } = request.body;

    if (admin_password !== ADMIN_PASSWORD) {
      const categories = await db.get_all_categories();
      return response.status(403).render('items/form', {
        title: 'Edit item',
        item: { id, name, description, price, stock, category_id },
        categories,
        error_message: 'Action denied. Invalid admin password!'
      });
    }

    await db.update_item(id, { name, description, price, stock, category_id });
    //response.redirect(`/items/${id}`);
    response.redirect('/items');
  } catch (error) {
    next(error);
  }
}

async function item_delete_get(request, response, next) {
  try {
    const id = parseInt(request.params.id, 10);
    const item = await db.get_item_by_id(id);

    if (!item) {
      return response.status(404).render('404', { message: 'Item not found' });
    }

    response.render('items/delete', { title: 'Delete item', item, error_message: null });
  } catch (error) {
    next(error);
  }
}

async function item_delete_post(request, response, next) {
  try {
    const id = parseInt(request.params.id, 10);
    const { admin_password } = request.body;
    const item = await db.get_item_by_id(id);

    if (admin_password !== ADMIN_PASSWORD) {
      return response.status(403).render('items/delete', {
        title: 'Delete item',
        item,
        error_message: 'Action denied. Invalid admin password!'
      });
    }

    await db.delete_item(id);
    response.redirect('/items');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  item_list,
  item_detail,
  item_create_get,
  item_create_post,
  item_update_get,
  item_update_post,
  item_delete_get,
  item_delete_post,
};