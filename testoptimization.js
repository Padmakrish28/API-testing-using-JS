import supertest from 'supertest';
import { expect } from 'chai';
const request = supertest('https://gorest.co.in/public/v2/');

const TOKEN = 'a399cea8250386852793e78b6d969ff491b1a6e55d938f6036bf2d3965b0e2fc';

describe('Users', () => {
    let userId;
    describe('POST', () => {
        it('POST/users', () => {
            const data = {
                email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
                name: 'testnameoptimization',
                gender: 'male',
                status: 'inactive'

            };
            return request.post('users').set("Authorization", `Bearer ${TOKEN}`).send(data).then((response) => {
                console.log(response.body);
                expect(response.body.email).to.eq(data.email);
                expect(response.body.status).to.eq(data.status);
                expect(response.body.gender).to.eq(data.gender);
                expect(response.body.name).to.eq(data.name);
                expect(response.body).to.deep.include(data);
                data.email = "test!@mail.ca";
                expect(response.body).to.deep.include(data);
                data.gender = "male";
                expect(response.body).to.deep.include(data);
                userId = response.body.id;
                console.log(userId);
            })
        })
    })
    describe('GET', () => {
        it('users', () => {
            return request.get(`users?access-token=${TOKEN}`).then((response) => {
                expect(response.body).to.not.be.empty;
            });
        });
        it('users/:id', () => {
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((response) => {
                //console.log(response.body);
                expect(response.body.id).to.be.eq(userId);
            })
        });
        it('users/page=1&status=active&gender=female', () => {
            const URL = `users?access-token=${TOKEN}&page=1&gender=female&status=active`;
            return request.get(URL).then((response) => {
                expect(response.body).to.not.be.empty;
                response.body.forEach((data) => {
                    expect(data.gender).to.be.eq('female');
                    expect(data.status).to.be.eq('active');
                })
            })
        })
    })
    describe('PUT', () => {
        it('users/:id', () => {
            const data = {
                status: 'active',
                name: `luffy ${Math.floor(Math.random() * 9999)}`
            }
            return request.put(`users/${userId}`).set('Authorization', `Bearer ${TOKEN}`).send(data).then((response) => {
                //console.log(response.body);
                //expect(response.body.name).to.eq(data.name);

                expect(response.body).to.deep.include(data);

            })
        })
    })
    describe("DELETE", () => {
        it('DELETE/users', () => {
            return request.delete(`users/${userId}`).set('Authorization', `Bearer ${TOKEN}`).then((response) => {
                expect(response.body).to.be.empty;
                expect(response.status).to.be.eq(204);
                // expect(response.body).to.be.eq('{}');
            })
        })
    })
});
