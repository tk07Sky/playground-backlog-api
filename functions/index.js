const fetch = require('node-fetch');
const functions = require('firebase-functions');
require('dotenv').config();

const Koa = require('koa')
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

const baseUrl = process.env.BACKLOG_URL;
const apiKeyParam = '?apiKey=' + process.env.API_KEY;
 
router
  .get('/issues/:issueId', async(ctx, next) => {
    const url = baseUrl + '/api/v2/issues/' + ctx.params.issueId;
    const res = await fetch(url + apiKeyParam);
    const jsonRes = await res.json();
    ctx.body = { res: jsonRes };
  })
  .post('/issues/finishedIssue/:issueId', async(ctx, next) => {
    const url = baseUrl + '/api/v2/issues/' + ctx.params.issueId;
    const body = 'statusId=4';
    const options = {
      method: 'PATCH',
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    const res = await fetch(url + apiKeyParam, options);
    const jsonRes = await res.json();
    ctx.body = { res: jsonRes };
  });

app.use(router.routes()).use(router.allowedMethods());
 
exports.api = functions.https.onRequest(app.callback());
