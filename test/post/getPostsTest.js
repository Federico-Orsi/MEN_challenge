import axios from 'axios';
import chai from 'chai';
import mocha from 'mocha';
import '../../app.js';
import endpoints from '../../src/constants/endpoints.js';
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

let existingUser;
let existingUserToken;

let existingPost;

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

  describe(`GET ${POSTS}`, () => {
    before(async () => {
      existingPost = await generatePost({ author: existingUser._id });
    });

    it('Should return unauthorized as no header is sent', async () => {
      try {
        await instance.get(POSTS);
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 401);
      }
    });

    it('Should return existing posts', async () => {
      const posts = await instance.get(
        POSTS,
        buildAuthorizationHeader(existingUserToken),
      );
      assert.equal(posts.status, 200);
      assert.isNotEmpty(posts.data);
      const foundPost = posts.data.shift();
      assert.equal(foundPost.author, existingPost.author);
      assert.equal(foundPost.title, existingPost.title);
      assert.equal(foundPost.body, existingPost.body);
      assert.equal(foundPost._id, existingPost._id);
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
