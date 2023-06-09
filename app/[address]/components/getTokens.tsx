import getPrice from './getPrice';
import { RestClient, TokenBalancesByOwnerRequest } from '@hellomoon/api';
import dotenv from 'dotenv';
dotenv.config();

export default async function getUsersTokens(ownerAccount: string) {
  let data: [];
  const client = new RestClient(`${process.env.Bearer}`);
  await client.send(new TokenBalancesByOwnerRequest({
    ownerAccount
  }))
    .then((res: []) => {
      res.forEach(async (i: { mint: any; amount: any }) => {
        if (i.amount > 0) {
          const price = await getPrice(i.mint)
          console.log(`mint : ${i.mint}`)
          console.log(`amount : ${i.amount}`)
          console.log(`price : ${price * i.amount} \n`)
          // console.log(`value : ${json?.data?.value}`)
          //
          data.push({ mint, amount, price });
        } else {
          console.log("request failed blah")
        }
      })
    })
  // .catch(console.error);
  return data;
}
