// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

import { getCurrentUser } from './endpoints/users.js';
import { logCheck } from './checkers/logCheck.js';

describe('Test aleho-bot', () => {
    describe('Server Test:', () => {
        it('Error log check', async () => {
            const test = logCheck();
            assert.equal(test, 'pass');
        });
    });
});