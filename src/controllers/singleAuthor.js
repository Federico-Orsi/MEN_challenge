import postService from "../services/postService.js";
import userService from "../services/userService.js";



export const postsBySingleAuthor = async (req, res, next) => {
    try {

    const author = await userService.findById(req.params.authorId)
    const authorId = author._id
    const toStr = authorId.toString()


    if (author) {

        const allPosts = await postService.findAll();
        const postsPorAutor = allPosts.filter(elem => elem.author == toStr)


     if(postsPorAutor.length > 0){
        res.status(200).json(postsPorAutor);

     }else{
        res.status(200).json('El autor buscado aún no ha realizado ningun post.');
     }


    } else{
        throw new Error("Author not found!!");
     }



    } catch (err) {
      console.log(err);
      res.status(404).json("Author not found!!");
    }
  };

