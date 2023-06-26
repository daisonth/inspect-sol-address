import dotenv from 'dotenv';
dotenv.config();

interface tokenType {
  mint: string,
  amount: number,
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
  const userFts: Array<tokenType> = new Array();
  const userNfts: Array<tokenType> = new Array();

  for (let i in data) {

    const mint = data[i].account;
    let name: string = "nil";
    let symbol: string = "nil";
    let price: number
    let totalPrice: number
    let image: string
    let amount = 0;
    let isfundible: boolean;

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

    if (data[i].legacyMetadata != null) {
      name = data[i].legacyMetadata.name;
      symbol = data[i].legacyMetadata.symbol;
      price = await getPrice(mint);
      totalPrice = amount * price;
      image = data[i].legacyMetadata.logoURI;
    } else {
      if (data[i].offChainMetadata.metadata == null) continue
      name = data[i].offChainMetadata.metadata.name;
      symbol = data[i].offChainMetadata.metadata.symbol;
      price = await getPrice(mint);
      totalPrice = amount * price;
      image = data[i].offChainMetadata.metadata.image;
    }

    const token: tokenType = {
      mint: mint,
      amount: amount,
      name: name,
      symbol: symbol,
      price: price,
      totalPrice: totalPrice,
      image: image
    } as tokenType

    if (isfundible) userFts.push(token)
    else userNfts.push(token)
  }

  userFts.sort((a: tokenType, b: tokenType) => b.amount - a.amount);
  userNfts.sort((a: tokenType, b: tokenType) => b.amount - a.amount);

  return { userFts, userNfts }
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


