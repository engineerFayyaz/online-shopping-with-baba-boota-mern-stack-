import { getSession } from "next-auth/react";
import ProductModel from "../../../models/product";
import dbConnect from "../../../utils/dbConnect";

export default async function apiHandler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (!session || !session.user.a)
    return res
      .status(403)
      .json({ success: false, message: "Access Forbidden" });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await ProductModel.find({}).sort("-date").exec();
        res.status(200).json({ success: true, product });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
