import jwt from 'express-jwt';
import { JWT_SECRET } from '../../../config.js';

export const isAuthorized = jwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
});


// export default  isAuthorized ;



// export const isAuthorized = (req, res, next) => {

//   try {


//     next()

//   } catch (error) {

//       next(error)
//   }

// }