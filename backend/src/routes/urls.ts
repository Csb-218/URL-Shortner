import { Router} from 'express';
import {createURL,deleteURL,getAllURLs,incrementClicks,getURLById} from "../controllers/urlControllers"



const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all URLs
router.get('/', asyncHandler(getAllURLs));

// Create new short URL
router.post('/', asyncHandler(createURL));

// Get URL by ID
router.get('/:id', asyncHandler(getURLById));

// Increment clicks
router.post('/:id/clicks', asyncHandler(incrementClicks));

// Delete URL
router.delete('/:id',asyncHandler(deleteURL));

export { router as URLRouter };