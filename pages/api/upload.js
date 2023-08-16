import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminReq } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminReq(req,res);


  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length:", files.file.length);

  cloudinary.config({
    cloud_name: "dobfxe13v",
    api_key: "468811251212552",
    api_secret: "7VZQips0N9xuufX2BI8N6YGf26c",
  });

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    const result = await cloudinary.uploader.upload(file.path, {
      Key: newFilename,
      Body: fs.readFileSync(file.path),
      ACL: "public-read",
      ContentType: mime.lookup(file.path),
    });
    const link = result.url;
    links.push(link);

    console.log(result);
    console.log("Link:", links);
  }
  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
