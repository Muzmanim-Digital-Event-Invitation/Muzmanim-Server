import express from "express";
import jwt_decode from "jwt-decode";
import { UserModel } from "../4-models/UserModel";
import { Register} from "../5-logic/auth-logic";

export const authRouter = express.Router();

authRouter.post('/register', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user: UserModel = jwt_decode(token);
    const result = await Register(user.email);
    console.log(`Registration result: ${JSON.stringify(result)}`);
    res.json(result).status(200);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    res.status(500).send(`Failed to register user: ${e.message}`);
  }
});

  
