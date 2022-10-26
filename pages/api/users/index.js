import { getSession } from "next-auth/react";
import userModel from "../../..//models/user";
import dbConnect from "../../..//utils/dbConnect";

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
        const users = await userModel
          .find({ isAdmin: false })
          .select(["-hash", "-salt", "-isAdmin"]);
        res.status(200).json({ success: true, users });
      } catch (err) {
        res.status(500).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await userModel.findByIdAndRemove(req.query.id);
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
