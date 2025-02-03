import express from 'express';
import { getAllContacts } from '../controllers/ContactController.js';
import { AdminOnly } from '../middleware/Auth.js';

const contactRouter = express.Router();

contactRouter.post("/contact/getAllContacts",AdminOnly,getAllContacts);

export default contactRouter;



