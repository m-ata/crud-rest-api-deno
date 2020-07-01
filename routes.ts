import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/product.ts';

const router = new Router();

router.get('/api/v1/products', getAllProducts)
        .get('/api/v1/product/:id', getProduct)
        .post('/api/v1/product/add', addProduct)
        .put('/api/v1/product/update/:id', updateProduct)
        .delete('/api/v1/product/delete/:id', deleteProduct)

export default router;
