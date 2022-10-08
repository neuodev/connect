import express, { Request, Response } from "express";
import User from "../models/User";
import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";
import { getErrMsg } from "../utils/error";

const uploadRouter = express.Router();

uploadRouter
  .route("/uploadProfilePhoto/:id")
  .post(async (req: Request<{ id: string }>, res: Response) => {
    try {
      if (!req.files) {
        return res.status(400).json({ error: "No file Uploaded" });
      }

      // find the user
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "No file Uploaded" });
      }
      const file = req.files.file as UploadedFile;

      const imageTypes = /jpg|png|jpeg|webp/i;
      if (!imageTypes.test(file.mimetype)) {
        res
          .status(400)
          .json({ error: "Not allowed to upload this types of tiles " });
        return;
      }

      file.name = `${uuid()}${path.extname(file.name)}`;
      file.mv(
        `${__dirname}/../../client/public/images/${file.name}`,
        async (error) => {
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
      res.json({ error: getErrMsg(error) });
    }
  });

export default uploadRouter;
