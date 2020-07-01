import { v4 } from 'https://deno.land/std/uuid/mod.ts';
interface Product {
    id: string,
    name: string,
    description: string,
    price: number
}

let products: Product[] = [
    {
        id: '1',
        name: 'Test Product1',
        description: 'This is Product one',
        price: 10
    },
    {
        id: '2',
        name: 'Test Product2',
        description: 'This is Product two',
        price: 10
    },
    {
        id: '3',
        name: 'Test Product3',
        description: 'This is Product three',
        price: 10
    },
];

// get all products
const getAllProducts = ({ response }:  {response: any}) => {
    response.body = {
        success: true,
        data: products
    }
}

// get product by id
const getProduct = ({ params, response} : {params: {id: string}, response: any}) => {
    const product = products.find(product => product.id === params.id);

    if(product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product
        };
    } else{
        response.body = {
            success: false,
            msg: 'No data found'
        };
    }
}

//add product
const addProduct = async ({ request, response } : { request: any, response: any}) => {
    const body = await request.body();
    if(!request.hasBody) {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'No Data'
        }
    } else {
        const product: Product = body.value;
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product
        }
    }
}

// update product
const updateProduct = async ({ params, request, response} : { params: {id: string}, request : any, response: any }) => {
    const product = products.find(p => p.id === params.id);

    if(product) {
        const body = await request.body();

        const updateData : {
            name?: string;
            description?: string;
            price?: number
        } = body.value;

        console.log(updateData);

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p);

        request.status = 200;
        request.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'Not found'
        }
    }
}

//delete Product
const deleteProduct = ({ params, response} : {params: {id: string}, response: any}) => {
    products = products.filter(p => p.id !== params.id);

    response.body = {
        success: true,
        msg: 'Product removed'
    }
}

export { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct }