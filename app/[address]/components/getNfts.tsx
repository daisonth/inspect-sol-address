import { RestClient, NftMintsByOwnerRequest } from '@hellomoon/api';
// import getPrice from './getPrice';

import dotenv from 'dotenv';
dotenv.config();

interface Nfts {
  nftmint: string,
  name: number,
  symbol?: string,
  uri?: number,
}

export default async function getUsersNfts(ownerAccount: string) {

  const client = new RestClient(`${process.env.Bearer}`);

  client.send(new NftMintsByOwnerRequest({ ownerAccount }))
    .then(dothis)
    .catch(console.error);
}

async function dothis(res: any) {
  console.log(`\nNFTS\n`)
  let result = res.data;

  let data: Nfts[] = new Array();

  for (let i in result) {
    // console.log(result[i].metadataJson)
    data.push(Object.create({
      nftmint: result[i].nftMint,
      name: result[i].metadataJson.name,
      symbol: result[i].metadataJson.symol,
      uri: result[i].metadataJson.uri,
    }));
  }

  let n = 0;
  data.forEach(i => console.log(`${++n}) mint: ${i.nftmint} | name: ${i.name} | symbol: ${i.symbol} | uri:${i.uri}`))
  console.log(`Token count : {data.length}`)
}

