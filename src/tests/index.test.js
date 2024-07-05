let chai = require('chai');
const httpFunction = require('../functions/test')
const { app } = require('@azure/functions');
// const context = require('./defContext')
let expect = chai.expect;

// it ('Http trigger should return known text', async () => {
// 	const request = {
// 		query: { name: 'Bill' }
// 	};
// 	await httpFunction(context,request);

// 	expect(context.log.callCount).to.equal(1);
// 	expect(context.res.body).equal('Hello Bill');
// });

const request = require('supertest');
const sinon = require('sinon');

describe('Models Function', () => {
    let context;

    beforeEach(() => {
        context = {
            log: sinon.spy()
        };
    });

    it('should return 400 if lower or greater query parameters are missing', async () => {
        const res = await request(app)
            .get('/api/models')
            .query({ lower: '' });

        expect(res.status).to.equal(400);
        expect(res.text).to.equal("Please provide both 'lower' and 'greater' query parameters.");
    });

    it('should return 400 if lower or greater query parameters are not valid numbers', async () => {
        const res = await request(app)
            .get('/api/models')
            .query({ lower: 'abc', greater: '123' });

        expect(res.status).to.equal(400);
        expect(res.text).to.equal("'lower' and 'greater' query parameters must be valid numbers.");
    });

    it('should return 200 and the correct response if lower and greater query parameters are valid numbers', async () => {
        const res = await request(app)
            .get('/api/models')
            .query({ lower: '123', greater: '456' });

        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Received 'lower' value: 123, 'greater' value: 456");
    });
});