import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config.js";
import errorCodes from "../../constants/errorCodes.js";

const middle = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const [, token] = authHeader.split(' ');

        const payload = jwt.verify(token, JWT_SECRET )

        const userQueHaceElPost = payload._id


        if (userQueHaceElPost == req.body.author) {
           next()
        }else{
            throw new Error(errorCodes.POST_AUTHOR_INVALID);
        }



    } catch (err) {
      console.log(err);
      res.status(401).json(err)
    }
  };

  export default middle;



