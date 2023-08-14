import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminReq } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminReq(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, images, category, productProperties } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      productProperties,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const {
      title,
      description,
      price,
      _id,
      images,
      category,
      productProperties,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        title: title,
        description: description,
        price: price,
        images: images,
        category: category,
        properties: productProperties,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
