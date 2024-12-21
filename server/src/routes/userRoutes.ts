import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles(['admin']), getAllUsers);
// router.put(
//   '/:id',
//   authenticateJWT,
//   authorizeRoles(['admin', 'customer']),
//   updateUser
// );

// Create a new user
router.post('/', createUser);

export default router;
