import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { upload } from '../middlewares/multer';
import AdCampaign from '../models/Campaign';
const router = express.Router();

router.post('/create', authenticate, upload.single('media'), async (req, res) => {
  try {
    const { title, objective, budget, startDate, endDate } = req.body;
    const mediaPath = (req.file && req.file.path) ? req.file.path : null;
    const mediaUrl = mediaPath ? `${req.protocol}://${req.get('host')}/${mediaPath}` : '';
    const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

    const newCampaign = new AdCampaign({
      title,
      objective,
      budget,
      startDate,
      endDate,
      adCreative: {
        media: mediaUrl,
        mediaType
      },
      user: req.user._id
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', newCampaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const { exec } = require('child_process');
const path = require('path');

router.post('/generate-ads', authenticate, async (req, res) => {
  try {
    const campaignData = req.body;
    const preprocessedData = preprocessCampaignData(campaignData);
    const scriptPath = path.join(__dirname, '../../scripts/ad_generation.py');
    const pythonCommand = `python3 ${scriptPath} '${JSON.stringify(preprocessedData)}'`;

    exec(pythonCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${stderr}`);
        return res.status(500).json({ message: 'Error generating ad variants' });
      }
      const adVariants = JSON.parse(stdout);

      res.status(200).json({ message: 'Generated ad variants successfully', adVariants });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
