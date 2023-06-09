import { RestClient, TokenBalancesByOwnerRequest } from '@hellomoon/api';
import getPrice from './getPrice';

import dotenv from 'dotenv';
dotenv.config();

interface tokens {
  mint: string,
  amount: number,
  name?: string,
  price?: number,
  image?: string,
}

export default async function getUsersTokens(ownerAccount: string) {

  const client = new RestClient(`${process.env.Bearer}`);

  client.send(new TokenBalancesByOwnerRequest({ ownerAccount }))
    .then(dothis)
    .catch(console.error);
}

async function dothis(res: any) {
  console.log(`\n\n\n\nits an fucking ${typeof res}\n\n\n\n\n`)
  // let data: { mint: string, amount: string, price: number }[] = new Array();
  let data: tokens[] = new Array();

  for (let i in res) {
    if (res[i].amount > 0) {
      let price = await getPrice(res[i].mint)
      data.push(Object.create({
        mint: res[i].mint,
        amount: res[i].amount,
        price: price
      }));
    }
  }

  console.log(`${data[0].mint}\n${data[0].amount}\n${data[0].price}\n${data[0].mint}\n`);
}
