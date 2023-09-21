import axios from 'axios';
import chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import mocha from 'mocha';
import '../../app.js';
import endpoints from '../../src/constants/endpoints.js';
import languages from '../../src/constants/languages.js';
// import translationsEs from '../../src/locales/en.json';
import User from '../../src/models/user.js';
import { signJwt } from '../../src/utils/jwtUtil.js';
import { generateUser } from '../common/factories/userFactory.js';
import { buildAuthorizationHeader } from '../common/utils/testUtil.js';


const { describe, it } = mocha;
const { before, after } = mocha;
const { assert } = chai;

let customerUser;

const { TRANSLATIONS } = endpoints;

const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('Translations Controller', () => {
  before(async () => {
    customerUser = await generateUser();
  });

  describe(`GET ${TRANSLATIONS}/${languages.EN}`, () => {
    it('Should return unauthorized', async () => {
      try {
        await instance.get(`${TRANSLATIONS}/${languages.EN}`);
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, StatusCodes.UNAUTHORIZED);
      }
    });

    it('Should validate translations lang', async () => {
      try {
        const token = signJwt(customerUser);
        await instance.get(
          `${TRANSLATIONS}/pt`,
          buildAuthorizationHeader(token),
        );
        assert.fail();
      } catch (err) {
        assert.equal(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
      }
    });

    it('Should get english translations', async () => {
      const token = signJwt(customerUser);
      const translationsResponse = await instance.get(
        `${TRANSLATIONS}/${languages.EN}`,
        buildAuthorizationHeader(token),
      );
      assert.equal(translationsResponse.status, StatusCodes.OK);
      assert.deepEqual(translationsResponse.data, translationsEs);
    });
  });

  after(async () => {
    await User.remove({});
  });
});
