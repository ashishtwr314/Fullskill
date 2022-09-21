// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const child = require("child_process");
import { PythonShell } from "python-shell";

export default function handler(req, res) {
  if (req.body.trim() === "")
    return res.status(200).send({ err: false, output: "" });

  PythonShell.runString(req.body, null, function (err, results) {
    if (err) {
      return res.status(200).send({ err: true, output: err.message });
    }

    res.status(200).send({ err: false, output: results });
  });
}
