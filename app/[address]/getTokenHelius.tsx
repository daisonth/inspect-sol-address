import dotenv from 'dotenv';
dotenv.config();

export default async function getTokensHelius(ownerAccount: string) {
  const url = `https://api.helius.xyz/v0/addresses/${ownerAccount}/balances?api-key=${process.env.Helius_pin}`;
  const res = await fetch(url);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  let count = 0;
  const data = await res.json();
  console.log(`\nHelius Balances : \n`);
  // data.tokens.forEach((i: any) => {
  //   if (i.amount > 1)
  //     console.log(`${++count})`, i)
  // })
  // console.log(data);
  // console.log(`native Balance : `, data.nativeBalance / 1000000000);

  await getMetadata(data.tokens);
}

async function getMetadata(tokens: any) {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.Helius_pin}`;

  let queryTokens = tokens.map((e: any) => e.mint)
  queryTokens.push("So11111111111111111111111111111111111111112");
  // let queryTokens = ["So11111111111111111111111111111111111111112"]
  console.log(`Helius Token addresses :`)
  let count = 0;
  queryTokens.forEach((i: any) => console.log(`${++count}) ${i}`));
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
  console.log("metadata: ", data);
};
