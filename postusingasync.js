import supertest from 'supertest';
import { expect } from 'chai';
const request = supertest('https://gorest.co.in/public/v2/');

const TOKEN = 'a399cea8250386852793e78b6d969ff491b1a6e55d938f6036bf2d3965b0e2fc';

describe.only('Posts', () => {
    it('POST/posts', async () => {
        const data = {
            id: 56,
            user_id: "7712942",
            title: "sampletitle",
            body: "sample-body"
        };
        const response = await request.post('posts').set("Authorization", `Bearer ${TOKEN}`).send(data);
        // expect(response.body).to.deep.include(data);
        console.log(response.body);
    })
})
