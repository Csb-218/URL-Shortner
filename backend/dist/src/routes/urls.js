"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLRouter = void 0;
const express_1 = require("express");
const urlControllers_1 = require("../controllers/urlControllers");
const router = (0, express_1.Router)();
exports.URLRouter = router;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Get all URLs
router.get('/', asyncHandler(urlControllers_1.getAllURLs));
// Create new short URL
router.post('/', asyncHandler(urlControllers_1.createURL));
// Get URL by ID
router.get('/:id', asyncHandler(urlControllers_1.getURLById));
// Increment clicks
router.post('/:id/clicks', asyncHandler(urlControllers_1.incrementClicks));
// Delete URL
router.delete('/:id', asyncHandler(urlControllers_1.deleteURL));
