import Category from "../models/category.js";
// CREATE: Add a new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create new category
    const category = new Category({ name, description });  // Use "Category" instead of "category"
    await category.save();

    return res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// READ: Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// READ: Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// UPDATE: Update category by ID
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        message: 'Category not found!',
      });
    }

    return res.status(200).json({
      message: 'Category updated successfully!',
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// DELETE: Delete category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found!',
      });
    }

    return res.status(200).json({
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
