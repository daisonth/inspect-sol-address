import dotenv from 'dotenv';
dotenv.config();

interface tokenType {
  mint: string,
  amount: number,
  isfundible: boolean,
  name: string,
  symbol: string,
  price: number,
  totalPrice: number,
  image: string,
}

const nativeSol = "So11111111111111111111111111111111111111112";

async function getBalance(ownerAccount: string) {
  const url = `https://api.helius.xyz/v0/addresses/${ownerAccount}/balances?api-key=${process.env.Helius_pin}`;

  const result = await fetch(url);
  if (!result.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await result.json();
  return data
}

async function getMetadata(res: any) {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.Helius_pin}`;

  let queryTokens = res.tokens.map((e: any) => e.mint)
  queryTokens.push(nativeSol);
  queryTokens = queryTokens.slice(0, 99)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mintAccounts: queryTokens,
      includeOffChain: true,
      disableCache: false,
    }),
  });

  const data = await response.json();
  return data;
}

async function organiseMetadata(data: any, res: any) {
  const userTokens: Array<tokenType> = new Array();

  for (let i in data) {

    const mint = data[i].account;
    let name: string
    let symbol: string
    let price: number
    let totalPrice: number
    let image: string
    let amount = 0;
    let isfundible: boolean;

    if (data[i].legacyMetadata != null) {
      name = data[i].legacyMetadata.name;
      symbol = data[i].legacyMetadata.symbol;
      price = await getPrice(mint);
      totalPrice = amount * price;
      image = data[i].legacyMetadata.logoURI;
    } else {
      name = data[i].offChainMetadata.metadata.name;
      symbol = data[i].offChainMetadata.metadata.symbol;
      price = await getPrice(mint);
      totalPrice = amount * price;
      image = data[i].offChainMetadata.metadata.image;
    }

    if (data[i].onChainMetadata.metadata != null && data[i].onChainMetadata.metadata.tokenStandard == 'NonFungible') {
      isfundible = false
      res.tokens.forEach((t: any) => {
        if (t.mint == mint) amount = t.amount;
      })
    } else {
      isfundible = true
      res.tokens.forEach((t: any) => {
        if (t.mint == mint) amount = t.amount / Math.pow(10, t.decimals);
      })
      if (mint == nativeSol) amount = res.nativeBalance / Math.pow(10, 9);
    }
    const token: tokenType = {
      mint: mint,
      amount: amount,
      isfundible: isfundible,
      name: name,
      symbol: symbol,
      price: price,
      totalPrice: totalPrice,
      image: image
    } as tokenType

    userTokens.push(token);
  }

  userTokens.sort((a, b) => a.amount - b.amount);
  return userTokens
}

async function getPrice(mint: string) {
  const response = await fetch(
    `https://public-api.birdeye.so/public/price/?address=${mint}`
  );
  const json = await response.json();

  return json?.data?.value || 0;
}

export default async function getTokens(owneraccount: string) {
  const tokenBalances = await getBalance(owneraccount);
  const tokenMetadata = await getMetadata(tokenBalances);
  const tokens = await organiseMetadata(tokenMetadata, tokenBalances);
  return tokens
}


