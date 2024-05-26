# bitgesell-fees

<img src="Icon.png" style="height: 60px;"/>

## Introduction

A simple service that gives best, good fees for  transactions. Note: Transaction fees may vary a lot for a UTXO based model. A UTXO is a collection of small unpsent transaction outputs spread across multiple transactions.

Read more About Transactions, UTXO model: [UTXO Guide ](https://community.magiceden.io/learn/utxo-guide)

## Usage

```bash
curl https://us-central1-bitgesellfees.cloudfunctions.net/app/v1/default/fee
```

Default fees: 

```sh
{"minFeeBGL":0.0001,"minFeeSatoshi":10000}
```

Estimate Fees:

```sh
curl https://us-central1-bitgesellfees.cloudfunctions.net/app/v1/agreggate/fees
```

```sh
{
    "v1": 0.1,
    "min_fee": 0.0001,
    "best": 0.00999465,
    "good": 0.0099125
}
```

## DEFAULT_MIN fees

Bitgesell follows the Bitcoin transaction model which uses a proposed minimum fee of `10,000 satoshis`, this is equivalent to `0.0001 BGL`

## Usage
For usage, see `usage/` for a visualized graph

## Contribution

All contributions are highly welcome!

## LICENSE
`MIT`