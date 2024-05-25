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
  const { best_average, good } = await aggregateBlockFees(res)
  return res.json({
    v1: API_VERSION,
    min_fee: DEFAULT_MIN_FEE,
    best: best_average,
    good: good
  })
}

async function aggregateBlockFees(res: Response) {
  const sdkInstance = new BitgesellBlockchainSDK({
    baseAPIURL: 'https://api.bitaps.com/bgl/v1/blockchain'
  })


  try {

    const blockDataTwelveHours: Array<BlockStats> = await sdkInstance.blockchain.getBlockDataLastNHours(12)

    let best_average = 0, good = 0

    blockDataTwelveHours.forEach(blockData => {
      best_average += blockData.miner ? mathjs.mean(Number(blockData.miner)) : DEFAULT_MIN_FEE * 0.6
      good += blockData.miner ? mathjs.median(Number(blockData.miner)) : DEFAULT_MIN_FEE * 0.4
    })
    return {
      best_average,
      good
    }

  } catch (error) {
    return res.json({ error: `${error}` })
  }
}

export {
  defaultFeeHandler,
  feeAggregatorHandler
}