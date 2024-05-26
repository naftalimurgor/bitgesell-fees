import {
  Request,
  Response
} from "express";

// @ts-ignore
import bglunits = require('bgl-units')
import mathjs = require('mathjs')

import axios from "axios";

const DEFAULT_MIN_FEE = bglunits.toBGL(10000) // proposed fee of 10,000 statoshis = 0.0001 BGL
const API_VERSION = 0.1

const defaultFeeHandler = (
  req: Request,
  res: Response
) => {
  return res.json({

    minFeeBGL: DEFAULT_MIN_FEE,
    minFeeSatoshi: bglunits.toSatoshiUnits(0.0001)
  })
}

const feeAggregatorHandler = async (
  req: Request,
  res: Response
) => {
  // @ts-ignore
  const { good_median, best_average } = await aggregateBlockFees(res)
  const best = bglunits.toBGL(mathjs.ceil(best_average))
  const good = bglunits.toBGL(mathjs.ceil(good_median))

  return res.json({
    v1: API_VERSION,
    min_fee: DEFAULT_MIN_FEE,
    best: best,
    good: good,
  })
}

async function aggregateBlockFees(res: Response) {

  try {


    const response = await axios.get('https://api.bitaps.com/bgl/v1/blockchain/mempool/transactions');
    const mempoolTxes = response.data.data.list

    let fees: Array<number> = []
    // @ts-ignore
    mempoolTxes.forEach(tx => {
      // @ts-ignore
      fees.push(tx.fee)
    })

    const best_average = mathjs.mean(fees)
    const good_median = mathjs.median(fees)

    return {
      best_average,
      good_median
    }
  } catch (error) {
    return res.json({ error: `${error}` })
  }
}

export {
  defaultFeeHandler,
  feeAggregatorHandler
}