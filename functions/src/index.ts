// https://stackoverflow.com/questions/76434349/firebase-cloud-functions-v2-error-when-deploying
import { setGlobalOptions } from "firebase-functions/v2/options";
import { onRequest } from "firebase-functions/v1/https";
setGlobalOptions({ maxInstances: 10 });

import express = require("express");

import cors = require("cors");


import {
  feeAggregatorHandler,
  defaultFeeHandler
} from './feeService'

const app = express()
app.disable('etag')

app.use(express.json())
app.use(cors())

app.get('/v1/default/fee', defaultFeeHandler)
app.get('/v1/agreggate/fees', feeAggregatorHandler)

exports.app = onRequest(app)