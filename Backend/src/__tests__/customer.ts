import request from 'supertest';
import app  from "../../app"
import {Express} from 'express-serve-static-core';
import { sequelize } from '../config/db';
import { Customer } from '../models/customer';

let server: Express

describe('Customer tests', () => {
  beforeAll(() => {
    server = app;
    return sequelize.sync()
  });
  beforeEach(async () => {
    await Customer.destroy({
      where: {Email:"h@gmail.com"}, 

    });});

  it('return 200 ok when sign in request is valid', (done) => {
  request(app).post('/login').send({
    Email: "hala@gmail.com",
    Password: "123"
  }).then((response: { status: any; }) => {
    expect(response.status).toBe(200);
    done();
  });
});
  it('should return 200',  (done) => {
    request(server)
      .post('/signup').send({
        Email:"h@gmail.com",
        UserName:"h",
        FirstName:"hh",
        LastName:"BB",
        Password:"123"
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.success).toBe(1)
        done()
      })
  });
});