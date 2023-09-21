import userService from '../../services/userService.js';

const registerUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(200).send(user);
    // return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default registerUser;
