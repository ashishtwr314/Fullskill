import mongoconn from "../../../helpers/connectdb";
import User from "../../../model/User";

export default async function handler(req, res) {
  console.log("CONNECTING MONGO");

  console.log("CONNEXETED TO  MONGO");

  const test = await User.create({
    firstName: "Ash",
    lastName: "Tiw",
  });

  User.find({}, (err, users) => {
    res.send(users);
  });
}
