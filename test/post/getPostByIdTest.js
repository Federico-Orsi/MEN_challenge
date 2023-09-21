import axios from 'axios';
import chai from 'chai';
import mocha from 'mocha';
import mongoose from 'mongoose';
import '../../app.js';
import endpoints from '../../src/constants/endpoints.js';
import errorCodes from '../../src/constants/errorCodes.js';
import Post from '../../src/models/post.js';
import User from '../../src/models/user.js';
import { signJwt } from '../../src/utils/jwtUtil.js';
import { generatePost } from '../common/factories/postFactory.js';
import { generateUser } from '../common/factories/userFactory.js';
import { buildAuthorizationHeader } from '../common/utils/testUtil.js';

const { POSTS } = endpoints;

const { before, after } = mocha;
const { describe, it } = mocha;
const { assert } = chai;

const { POST_NOT_EXISTS } = errorCodes;

let existingPost;
let existingUser;
let existingUserToken;

const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('Post Controller', () => {
  before(async () => {
    await User.remove({});
    existingUser = await generateUser();
    existingUserToken = signJwt(existingUser);
  });

  describe(`GET ${POSTS}/id`, () => {
    before(async () => {
      existingPost = await generatePost({ author: existingUser._id });
    });

    it('Should return unauthorized as no header is sent', async () => {
      try {
        await instance.get(`${POSTS}/${existingPost._id}`);
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 401);
      }
    });

    it('Should return not found as post does not exist', async () => {
      try {
        await instance.get(
          `/posts/${mongoose.Types.ObjectId()}`,
          buildAuthorizationHeader(existingUserToken),
        );
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 404);
        assert.equal(err.response.data.message, POST_NOT_EXISTS);
      }
    });

    it('Should return post by id successfully', async () => {
      const post = await instance.get(
        `${POSTS}/${existingPost._id}`,
        buildAuthorizationHeader(existingUserToken),
      );
      assert.equal(post.status, 200);
      assert.equal(post.data._id, existingPost._id);
      assert.equal(post.data.title, existingPost.title);
      assert.equal(post.data.body, existingPost.body);
      assert.equal(post.data.author, existingPost.author);
    });

    after(async () => {
      await Post.remove({});
    });
  });

  after(async () => {
    await User.remove({});
    await Post.remove({});
  });
});
