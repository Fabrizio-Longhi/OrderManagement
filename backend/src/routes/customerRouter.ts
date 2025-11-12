import { Router } from "express";

import {
    createCustomer,
    getCustomers,
    getCustomerById,
    deleteCustomers,
    updateCustomers
} from "../controllers/customerController"

const router = Router()

router.post("/", createCustomer);
router.get("/",getCustomers);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomers);
router.put("/:id", updateCustomers);

export default router