import postService from '../../services/postService.js';

const findAllPosts = async (req, res, next) => {
  try {
    const keywordFilter = req.query.category
    const postPaginado = await postService.paginado({category: keywordFilter},{})

    if (keywordFilter) {
    res.status(200).json(postPaginado);

    } else{
      const allPosts = await postService.findAll();
      res.status(200).send(allPosts);
    }


    // return next();
  } catch (err) {
    console.log(err);
    // return next(err);
  }
};

export default findAllPosts;
