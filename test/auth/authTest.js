import axios from 'axios';
import chai from 'chai';
import faker from 'faker';
import mocha from 'mocha';
import '../../app.js';
import endpoints from '../../src/constants/endpoints.js';
import errorCodes from '../../src/constants/errorCodes.js';
import User, {
  EMAIL_FIELD_NAME,
  MIN_PASSWORD_LENGTH,
} from '../../src/models/user.js';
import { assertHasFieldErrors } from '../common/utils/testUtil.js';
import {
  testEmptyBody,
  testEmptyEmail,
  testEmptyPassword,
  testInvalidEmail,
  testInvalidPasswordLength,
} from './authTestShared.js';

const { POST_AUTH_EMAIL, POST_REGISTER_EMAIL } = endpoints;

const { before, after } = mocha;
const { describe, it } = mocha;
const { assert } = chai;

const { EMAIL_ALREADY_IN_USE } = errorCodes;
const { PASSWORD_NOT_VALID, USER_NOT_EXISTS } = errorCodes;

const ALREADY_CREATED_EMAIL = faker.internet.email();
const ALREADY_CREATED_PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH);

const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('Auth Controller', () => {
  before(async () => {
    await User.remove({});
    await User.create({
      email: ALREADY_CREATED_EMAIL,
      password: ALREADY_CREATED_PASSWORD,
    });
  });

  describe(`POST ${POST_REGISTER_EMAIL}`, () => {
    it(
      'Should return bad request as body is empty',
      testEmptyBody(instance, POST_REGISTER_EMAIL),
    );

    it(
      'Should return bad request as body email is empty',
      testEmptyEmail(instance, POST_REGISTER_EMAIL),
    );

    it(
      'Should return bad request as body password is empty',
      testEmptyPassword(instance, POST_REGISTER_EMAIL),
    );

    it(
      'Should return bad request as email is not valid',
      testInvalidEmail(instance, POST_REGISTER_EMAIL),
    );

    it(
      'Should return bad request as body password is shorter than min length',
      testInvalidPasswordLength(instance, POST_REGISTER_EMAIL),
    );

    it('Should return bad request as email already exist', async () => {
      try {
        const email = ALREADY_CREATED_EMAIL;
        const password = faker.internet.password(MIN_PASSWORD_LENGTH);

        await instance.post(POST_REGISTER_EMAIL, {
          email,
          password,
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 422);
        assert.isNotEmpty(err.response.data.errors);
        assertHasFieldErrors(err, EMAIL_FIELD_NAME);
        const invalidEmailErr = err.response.data.errors.shift();
        assert.equal(invalidEmailErr.msg, EMAIL_ALREADY_IN_USE);
      }
    });

    it('Should create the user successfully', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password(MIN_PASSWORD_LENGTH);

      const user = await instance.post(POST_REGISTER_EMAIL, {
        email,
        password,
      });

      assert.equal(user.status, 200);
      assert.equal(user.data.email, email);
      assert.isUndefined(user.data.password);
    });
  });

  describe(`POST ${POST_AUTH_EMAIL}`, () => {
    it(
      'Should return bad request as body is empty',
      testEmptyBody(instance, POST_AUTH_EMAIL),
    );

    it(
      'Should return bad request as body email is empty',
      testEmptyEmail(instance, POST_AUTH_EMAIL),
    );

    it(
      'Should return bad request as body password is empty',
      testEmptyPassword(instance, POST_AUTH_EMAIL),
    );

    it(
      'Should return bad request as email is not valid',
      testInvalidEmail(instance, POST_AUTH_EMAIL),
    );

    it(
      'Should return bad request as body password is shorter than min length',
      testInvalidPasswordLength(instance, POST_AUTH_EMAIL),
    );

    it('Should return bad request as user with that email does not exist', async () => {
      try {
        const email = faker.internet.email();
        const password = faker.internet.password(MIN_PASSWORD_LENGTH);

        await instance.post(POST_AUTH_EMAIL, {
          email,
          password,
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 401);
        assert.equal(err.response.data.message, USER_NOT_EXISTS);
      }
    });

    it('Should return bad request as password is incorrect', async () => {
      try {
        const email = ALREADY_CREATED_EMAIL;
        const password = faker.internet.password(MIN_PASSWORD_LENGTH);

        await instance.post(POST_AUTH_EMAIL, {
          email,
          password,
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, 401);
        assert.equal(err.response.data.message, PASSWORD_NOT_VALID);
      }
    });

    it('Should login successfully', async () => {
      const email = ALREADY_CREATED_EMAIL;
      const password = ALREADY_CREATED_PASSWORD;

      const user = await instance.post(POST_AUTH_EMAIL, {
        email,
        password,
      });

      assert.equal(user.status, 200);
      assert.isNotEmpty(user.data._id);
      assert.equal(user.data.email, email);
      assert.isNotEmpty(user.data.token);
      assert.isUndefined(user.data.password);
    });
  });

  after(async () => {
    await User.remove({});
  });
});
