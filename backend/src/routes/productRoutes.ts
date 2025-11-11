import { Router } from "express";
import { getProducts,
        createProduct,
        deleteProducts,
        updateProducts,
        getProductById
    } from '../controllers/productController';


const router = Router();

router.get("/",getProducts);
router.post("/",createProduct);
router.put("/:id",updateProducts);
router.delete("/:id",deleteProducts);
router.get("/:id", getProductById);

export default router;