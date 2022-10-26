import { getSession } from "next-auth/react";
import orderModel from "../../../models/order";
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
        const id = req.query.id;
        const order = await orderModel.findById(id);
        res.status(200).json({ success: true, order });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const id = req.query.id;
        await orderModel.findByIdAndUpdate(id, {
          status: req.query.order_status,
          paymentStatus: req.query.payment_status,
        });
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
