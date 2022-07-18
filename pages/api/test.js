import { withAPIMiddleware } from "../../middleware/APIMiddleware";

async function test(req, res) {
  return res.status(200).json(req.user);
}

export default withAPIMiddleware(test);
