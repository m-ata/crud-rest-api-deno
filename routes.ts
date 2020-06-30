import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getAllProducts, getProduct, addProduct } from './controllers/product.ts';

const router = new Router();

router.get('/api/v1/products', getAllProducts)
        .get('/api/v1/product/:id', getProduct)
        .post('/api/v1/product/add', addProduct);

export default router;
