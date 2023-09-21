import postService from '../../services/postService.js';
import userService from '../../services/userService.js';

const createPost = async (req, res, next) => {
  try {

    const newPost = await postService.create(req.body);

    const user = await userService.findById(newPost?.author)

    const newPostConEmailDeUser = {newPost, user}

    res.status(200).send(newPostConEmailDeUser);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default createPost;
