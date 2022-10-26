import aws from "aws-sdk";
import customId from "custom-id-new";
import { getSession } from "next-auth/react";
import multer from 'multer';


import { IncomingForm } from 'formidable'
import fs from "fs";

var mv = require('mv');



const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});
export const config = {
  api: {
    bodyParser: false
  }
};
export default async function apiHandler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (!session || !session.user.a)
    return res
      .status(403)
      .json({ success: false, message: "Access Forbidden" });

  switch (method) {
    case "POST":
      console.log('sdfsdfdsfsdf')

      // try {
        const { query } = req;
        const imageName =
          customId({ randomLength: 10, lowerCase: true }) + query.name;

        // Multer Upload Image
       
        res.status(200).json({ success: true, name: imageName, url: "http://localhost:8500/public/"+query.name });

        const params = {
          Bucket: bucketName,
          Key: imageName,
          Expires: 120,
        };

        const url = await s3.getSignedUrlPromise("putObject", params);
        res.status(200).json({ success: true, name: imageName, url });
      // } catch (err) {
      //   console.log(err);
      //   res.status(500).json({ success: false, err: err.message });
      // }
      break;


    case "PUT":
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, async function (err, fields, files) {
          await saveFile(files.file);
          return res.status(201).send("");
        });
     })
      res.status(200).json({ success: true });

      break;  
    case "DELETE":
      try {
        const { query } = req;
        const params = {
          Bucket: bucketName,
          Key: query.name,
        };
        await s3.deleteObject(params).promise();
        res.status(200).json({ success: true, err: null });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

const saveFile = async (file) => {
  console.log(file.filepath);
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};
