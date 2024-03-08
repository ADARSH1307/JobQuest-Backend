const router = require("express").Router();
import { createUser, loginUser } from "../controllers/authContoller";


// REGISTRATION 

router.post("/register", createUser);


// LOGIN 
router.post("/login", loginUser);


export default router