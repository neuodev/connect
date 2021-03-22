const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { v1: uuidV1 } = require('uuid');
const path = require('path');
router.route('/uploadProfilePhoto/:id').post(async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ error: 'No file Uploaded' });
    }

    // find the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'No file Uploaded' });
    }
    const file = req.files.file;

    const imageTypes = /jpg|png|jpeg|webp/i;
    if (!imageTypes.test(file.mimetype)) {
      res
        .status(400)
        .json({ error: 'Not allowed to upload this types of tiles ' });
      return;
    }

    file.name = `${uuidV1()}${path.extname(file.name)}`;
    file.mv(
      `${__dirname}/../../client/public/images/${file.name}`,
      async error => {
        user.avatar = `/images/${file.name}`;
        await user.save();
        if (error) {
          console.log(error);
          return res.status(500).json({ error });
        }

        res
          .status(200)
          .json({ fileName: file.name, filePath: `/images/${file.name}` });
      }
    );
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports.uploadRouter = router;
