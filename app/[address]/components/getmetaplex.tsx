import { Nft, Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import dotenv from 'dotenv';
dotenv.config();

export default async function getUsersTokens2(ownerAccount: string) {
  const connection = new Connection(`https://mainnet.helius-rpc.com/?api-key=${process.env.Helius_rpc}`, 'confirmed',);
  const metaplex = new Metaplex(connection);
  const owner = await getOwner(ownerAccount);

  const Nfts = await metaplex.nfts().findAllByOwner({ owner });
  let i = 0;

  if (Nfts) {
    // console.log(Nfts);
    Nfts.forEach(token => console.log(`${++i}) ${token.name}`))
    // Nfts.forEach(token => {
    //   if (token.name.substring(0, 3) == "NAS") {
    //     console.log(`${++i}/) ${token.name}`)
    //   }
    // })
  }
}

const getOwner = async (ownerAccount: string) => {
  const owner = new PublicKey(ownerAccount);
  return owner;
}
