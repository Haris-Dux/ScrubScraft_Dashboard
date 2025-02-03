import express from 'express';
import { getAllContacts } from '../controllers/ContactController.js';

const contactRouter = express.Router();

contactRouter.post("/contact/getAllContacts",getAllContacts);

export default contactRouter;



