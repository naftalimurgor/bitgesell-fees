import {
  Request,
  Response
} from "express";

// @ts-ignore
import bglunits = require('bgl-units')
import mathjs = require('mathjs')

import { BitgesellBlockchainSDK } from "bitgesell-blockchain-sdk";
import { BlockStats } from "bitgesell-blockchain-sdk/build/main/types";

const DEFAULT_MIN_FEE = bglunits.toBGL(10000) // proposed fee of 10000 statoshis = 0.0001 BGL

const defaultFeeHandler = (
  req: Request,
  res: Response
) => {
  return res.json({ minFeeBGL: DEFAULT_MIN_FEE, minFeeSatoshi: bglunits.toSatoshiUnits(0.0001) })
}

const feeAggregatorHandler = (
  req: Request,
  res: Response
) => {

  return res.json({
    min_ee: DEFAULT_MIN_FEE,
    best_average_12h: '',
    good: ''
  })
}

async function aggregateBlockFees(res: Response) {
  const sdkInstance = new BitgesellBlockchainSDK({
    baseAPIURL: 'https://api.bitaps.com/bgl/v1/blockchain'
  })


  try {

    const blockDataTwelveHours: Array<BlockStats> = await sdkInstance.blockchain.getBlockDataLastNHours(12)

    let best_average = 0, good = 0

    blockDataTwelveHours.forEach(element => {
      best_average += mathjs.mean(Number(element.miner))
      good += mathjs.median(Number())

    })

  } catch (error) {

  }
}

export {
  defaultFeeHandler,
  feeAggregatorHandler
}