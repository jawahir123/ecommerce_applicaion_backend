import express from 'express';
import { 
  createProduct, 
  getProductsByCategory ,
  searchProducts,
  getAllProducts,
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productControler.js'; // Fixed typo in controller file name

const router = express.Router();


router.post('/', createProduct); // POST /api/products
router.get('/getAll',getAllProducts),
router.get('/:category', getProductsByCategory);
router.get('/search',searchProducts)
router.get('/getById/:id', getProductById); // GET /api/products/
// PUT: Update a product by ID
router.put('/:id', updateProduct); // PUT /api/products/:id

// DELETE: Remove a product by ID
router.delete('/:id', deleteProduct); // DELETE /api/products/:id

export default router;
