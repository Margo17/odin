import { bybit } from "ccxt";
import { NextApiRequest, NextApiResponse } from "next";

const validate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bybit_client = new bybit();
    bybit_client.apiKey = "gwitpuyX0lwDwDlJvk";
    bybit_client.secret = "gfOeSHudqi82vPzWt0EMHryeyrTcGDM14lBe";
    const balances = await bybit_client.fetchBalance();
    console.log(balances);
    const symbols = bybit_client.symbols;
    console.log(symbols);
    // const markets = await bybit_client.fetchMarkets();
    // console.log(markets);

    // markets.map(
    //   (market) => market.active === true && console.log(market.symbol)
    // );
    var trades;
    await bybit_client
      .fetchMyTrades("BIT/USDT:USDT")
      .then((resp) => (trades = resp))
      .catch((e) => console.log(e));
    // console.log(await bybit_client.fetchMyTrades());

    return res.status(200).send(trades);
  } catch (e) {
    return res.status(200).send(e);
  }
};

export default validate;
