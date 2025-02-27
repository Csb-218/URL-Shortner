"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllURLs = getAllURLs;
exports.createURL = createURL;
exports.getURLById = getURLById;
exports.incrementClicks = incrementClicks;
exports.deleteURL = deleteURL;
const shortid_1 = __importDefault(require("shortid"));
const Urls_1 = __importDefault(require("../models/Urls"));
function getAllURLs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const urls = yield Urls_1.default.find().sort({ createdAt: -1 });
            return res.json(urls);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error fetching URLs' });
        }
    });
}
;
function createURL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { originalUrl } = req.body;
            const urlId = shortid_1.default.generate();
            const shortUrl = `${process.env.BASE_URL}/api/${urlId}`;
            const url = new Urls_1.default({
                urlId,
                originalUrl,
                shortUrl,
                clicks: 0,
                createdAt: new Date()
            });
            yield url.save();
            return res.json(url);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error creating short URL' });
        }
    });
}
;
function getURLById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Increment');
        try {
            const url = yield Urls_1.default.findOneAndUpdate({ urlId: req.params.id }, { $inc: { clicks: 1 } }, { new: true });
            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }
            return res.json(url);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error fetching URL' });
        }
    });
}
;
function incrementClicks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = yield Urls_1.default.findOneAndUpdate({ urlId: req.params.id }, { $inc: { clicks: 1 } }, { new: true });
            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }
            return res.json(url);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error updating clicks' });
        }
    });
}
;
function deleteURL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = yield Urls_1.default.findOneAndDelete({ urlId: req.params.id });
            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }
            return res.json({ message: 'URL deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Error deleting URL' });
        }
    });
}
;
