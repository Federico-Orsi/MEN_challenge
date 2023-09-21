// import models from '../models';

import Post from '../models/post.js';

// const { Post } = models;

const create = (post) => Post.create(post);

const findAll = () => Post.find();
// const findAll = () => Post.find({});

const findById = (id) => Post.findById(id);

const paginado = (filtro, options) => Post.paginate(filtro, options);


const postService = { create, findAll, findById, paginado };

export default postService;
