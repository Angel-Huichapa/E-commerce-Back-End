const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with their associated products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name // Assuming the category name is sent in the request body
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name }, // Assuming the category name is sent in the request body
      { where: { id: req.params.id } }
    );
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;