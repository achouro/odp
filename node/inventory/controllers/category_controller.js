const db = require('../database/queries');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secret123';

exports.category_list = async (req, res, next) => {
  try {
    const categories = await db.get_all_categories();
    res.render('categories/index', { title: 'Categories', categories });
  } catch (err) {
    next(err);
  }
};

exports.category_detail = async (req, res, next) => {
  try {
    const [category, items] = await Promise.all([
      db.get_category_by_id(req.params.id),
      db.get_items_by_category(req.params.id)
    ]);
    if (!category) return res.status(404).render('404', { message: 'Category not found' });

    res.render('categories/detail', { title: category.name, category, items });
  } catch (err) {
    next(err);
  }
};

exports.category_create_get = (req, res) => {
  res.render('categories/form', { title: 'Create Category', category: {}, error_message: null });
};

exports.category_create_post = async (req, res, next) => {
  try {
    await db.create_category(req.body);
    res.redirect('/categories');
  } catch (err) {
    next(err);
  }
};

exports.category_update_get = async (req, res, next) => {
  try {
    const category = await db.get_category_by_id(req.params.id);
    if (!category) return res.status(404).render('404', { message: 'Category not found' });

    res.render('categories/form', { title: 'Edit Category', category, error_message: null });
  } catch (err) {
    next(err);
  }
};

exports.category_update_post = async (req, res, next) => {
  try {
    const { name, description, admin_password } = req.body;

    if (admin_password !== ADMIN_PASSWORD) {
      return res.status(403).render('categories/form', {
        title: 'Edit Category',
        category: { id: req.params.id, name, description },
        error_message: 'Invalid admin password! Action denied.'
      });
    }

    await db.update_category(req.params.id, { name, description });
    res.redirect(`/categories/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

exports.category_delete_get = async (req, res, next) => {
  try {
    const category = await db.get_category_by_id(req.params.id);
    if (!category) return res.status(404).render('404', { message: 'Category not found' });

    res.render('categories/delete', { title: 'Delete Category', category, error_message: null });
  } catch (err) {
    next(err);
  }
};

exports.category_delete_post = async (req, res, next) => {
  try {
    const { admin_password } = req.body;
    const category = await db.get_category_by_id(req.params.id);

    if (admin_password !== ADMIN_PASSWORD) {
      return res.status(403).render('categories/delete', {
        title: 'Delete Category',
        category,
        error_message: 'Invalid admin password! Action denied.'
      });
    }

    await db.delete_category(req.params.id);
    res.redirect('/categories');
  } catch (err) {
    next(err);
  }
};