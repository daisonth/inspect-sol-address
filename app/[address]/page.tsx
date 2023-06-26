import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { TokenList } from "./components/ListTokens"
import HeadTitle from "./components/headTitle"
import TabSwitcher from "./components/TabSwitcher"
import DashCard from "./components/DashCards"
import getTokens from "./components/getTokenHelius"
import dotenv from 'dotenv';
dotenv.config();

export default async function DashboardPage({ params }: any) {
  const tokens = await getTokens(params.address)

  let totalNftValue = tokens.userFts.reduce((a, b) => a + b.totalPrice, 0);
  let totalFtValue = tokens.userNfts.reduce((a, b) => a + b.totalPrice, 0);
  const totalAssetValue = totalFtValue + totalNftValue;

  let nfts = [];
  for (let i = 0; i < tokens.userNfts.length; i++) {
    nfts.push(
      <TokenList key={i} {...tokens.userNfts[i]} />
    );
  }

  let fts = [];
  for (let i = 0; i < tokens.userFts.length; i++) {
    fts.push(
      <TokenList key={i} {...tokens.userFts[i]} />
    );
  }

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6 xl:mx-64">
        <div className="flex items-center justify-between space-y-2">
          <HeadTitle txt="Dashboard" />
          <TabSwitcher />
        </div>
        <p>{params.address}</p>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashCard title="Total Asset Value" amount={totalAssetValue} subtitle="" />
              <DashCard title="Total FT Value" amount={totalFtValue} subtitle="" />
              <DashCard title="Total NFT Value" amount={totalNftValue} subtitle="" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Fundible Tokens</CardTitle>
                </CardHeader>
                <CardContent> {fts} </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Non Fundible Tokens</CardTitle>
                </CardHeader>
                <CardContent> {nfts} </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}

// async function getTokenBalancesByOwner(add: string) {
//   const { data } = await axios.post(
//     "https://rest-api.hellomoon.io/v0/token/balances-by-owner",
//     {
//       ownerAccount: add
//     },
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.Bearer}`,
//       },
//     }
//   );
//   const mintaddresses = data.map((item: any) => item.mint)
//   return mintaddresses
// }
//
// async function getMetaplexMetadata(add: string[]) {
//   const { data } = await axios.post(
//     "https://rest-api.hellomoon.io/v0/nft/mint_information",
//     {
//       "nftMint": add
//     },
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.Bearer}`,
//       },
//     }
//   );
//   const metadataJson = data.data.map((item: any) => item.nftMetadataJson)
//   return metadataJson
// }


