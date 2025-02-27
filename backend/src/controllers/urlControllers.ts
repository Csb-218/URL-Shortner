import { Request, Response, RequestHandler,Application} from 'express';
import shortid from 'shortid';
import Url from '../models/Urls';

export async function getAllURLs (req:Request, res:Response){
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    return res.json(urls);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching URLs' });
  }
};

export async function createURL (req:Request, res:Response){
  try {
    const { originalUrl } = req.body;
    const urlId = shortid.generate();
    const shortUrl = `${process.env.BASE_URL}/api/${urlId}`;

    const url = new Url({
      urlId,
      originalUrl,
      shortUrl,
      clicks: 0,
      createdAt: new Date()
    });

    await url.save();
    return res.json(url);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating short URL' });
  }
};

export async function getURLById (req:Request, res:Response) {
  console.log('Increment')
  try {
    const url = await Url.findOneAndUpdate(
      { urlId: req.params.id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!url) {

      return res.status(404).json({ error: 'URL not found' });
    }
    return res.json(url);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching URL' });
  }
};

export async function  incrementClicks (req:Request, res:Response) {
  
  try {
    const url = await Url.findOneAndUpdate(
      { urlId: req.params.id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    return res.json(url);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating clicks' });
  }
};

export async function deleteURL (req:Request, res:Response) {
  try {
    const url = await Url.findOneAndDelete({ urlId: req.params.id });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    return res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting URL' });
  }
};