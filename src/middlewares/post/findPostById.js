import errorCodes from '../../constants/errorCodes.js';
import postService from '../../services/postService.js';
import userService from '../../services/userService.js';

const { POST_NOT_EXISTS } = errorCodes;

const findPostById = async (req, res, next) => {
  try {
    const post = await postService.findById(req.params.postId);
    if (!post) {
      res.status(404).send({ message: POST_NOT_EXISTS });
      return next();
    }

    const author = await userService.findById(req.params.commentAuthor);
    if (!author) {
      res.status(404).send({ message: errorCodes.USER_NOT_EXISTS });
      return next();
    }

    if (req.body.comment) {

      const newComment = {
        autor: author.email,
        comment: req.body.comment
      }

      post.comments?.push(newComment)
      post.save()
      res.json(post)


    } else{
      res.json(post)
    }



     // return next();
  } catch (err) {
    return next(err);
  }
};

export default findPostById;
