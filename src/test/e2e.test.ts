import request from 'supertest';
import Sinon, { SinonSandbox } from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app-test';
import { connectMongo } from '../@core/database/database.mongo';
import { Server } from 'http';
import { Web3ConnectionClass } from "../@core/connectors/web3.connector";
import { UniversalsService } from '../@core/common/universals.service';
import { IResponse } from '../@core/common/response';

describe('API endpoints', () => {
  let server: Server;
  let mongoServer: any;
  let sandbox: SinonSandbox;

  beforeAll(async () => {
    sandbox = Sinon.createSandbox();
    server = app.listen(3000);
    mongoServer = await MongoMemoryServer.create();
    connectMongo(mongoServer.getUri(), ()=>{});
  });

  afterAll(async () => {
    sandbox.restore();
    server.close();
  });

  it('should get all accounts', async () => {
    const res = await request(server).get('/api/v1/accounts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should fail to create a new transaction due to insufficient funds', async () => {
    const from = '0x3c3d1f880daa38e2c56b1a49c98f89714c609b10';
    const to = '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3';
    const value = 1;

    const res = await request(server)
      .post('/api/v1/transactions')
      .send({ from, to, value });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Returned error: insufficient funds for gas * price + value")
  });

  it('should create a new transaction', async () => {
    const response : IResponse = {
      status: true,
      statusCode: 200,
      message: "Successful",
      data: {
        transactionHash: '0x3c3d1f880dduidh8877e2c56b1a49c98f89714c609b10'
      }
    }
    sandbox.stub(Web3ConnectionClass, "signTransaction")
    .returns(Promise.resolve(response));
    const from = '0x3c3d1f880daa38e2c56b1a49c98f89714c609b10';
    const to = '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3';
    const value = 1;

    const res = await request(server)
      .post('/api/v1/transactions')
      .send({ from, to, value });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('txHash');
  });

  it('should get balance of an account', async () => {
    const response : IResponse = {
      status: true,
      statusCode: 200,
      message: "Successful",
      data: "0"
    }
    sandbox.stub(Web3ConnectionClass, "getAccountBalance")
    .returns(Promise.resolve(response));
    const account = '0xCe50becD2CACb5EF0570EE3c21D650734f5Cbd8F';
    const res = await request(server).get(`/api/v1/accounts/balance/${account}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('balance');
  });
});