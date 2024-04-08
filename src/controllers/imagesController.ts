import { Request, Response } from 'express';
import Image, { ImageDocument } from '../models/Image';
import { asyncHandler } from '../Middleware/handleTryAndCatch';
import  { UserDocument }  from '../models/User';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export const createImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image } = req.body;
    const newImage: ImageDocument = await Image.create({ title, image, likesCount: 0});
    res.status(201).json({ newImage });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, image } = req.body;

    const img: ImageDocument | null = await Image.findById(id);

    if (!img) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    if (title) img.title = title;
    if (image) img.image = image;

    await img.save();

    res.status(200).json({ img });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images: ImageDocument[] = await Image.find({});
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const incrementLikes = asyncHandler(async (req: RequestWithUser, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.id; 
  const img: ImageDocument | null = await Image.findById(id);

  if (!img) {
    res.status(404).json({ error: 'Image not found' });
    return;  
  }

  if (img.likedBy.includes(userId)) {
    img.likesCount -= 1;
    img.likedBy = img.likedBy.filter(id => id !== userId);
  } else {
    img.likesCount += 1;
    img.likedBy.push(userId);
  }

  await img.save();

  res.status(200).json({ img });
});

//delete an image by Id

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const img: ImageDocument | null = await Image.findById(id);

    if (!img) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    await img.deleteOne();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};