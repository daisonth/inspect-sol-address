import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { RecentSales } from "./components/recent-sales"
import HeadTitle from "./components/headTitle"
import TabSwitcher from "./components/TabSwitcher"
import DashCard from "./components/DashCards"
import axios from "axios"
import { Metaplex } from "@metaplex-foundation/js"
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"

const url = "https://rest-api.hellomoon.io/v0/token/balances-by-owner";

async function TokenBalancesByOwner(add: string) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);

  const { data } = await axios.post(
    url,
    {
      ownerAccount: add
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer 014b8edb-ca22-4142-bbd8-58fa9e33ce95",
      },
    }
  );

  const addr = data[0].mint;
  const mintad = new PublicKey(addr);
  const nft = await metaplex.nfts().findByMint({ mintAddress: mintad });

  return data;
}

export default async function DashboardPage({ params }: any) {
  const data = await TokenBalancesByOwner(params.address)

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6 xl:mx-64">
        <div className="flex items-center justify-between space-y-2">
          <HeadTitle txt="Dashboard" />
          <TabSwitcher />
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashCard title="Total Net Worth" amount="$45,231.89" subtitle="+20.1% from last month" />
              <DashCard title="Total NFT Value" amount="$45,231.89" subtitle="+20.1% from last month" />
              <DashCard title="Total Token Worth" amount="$45,231.89" subtitle="+20.1% from last month" />
              <DashCard title="Total Next Worth" amount="$45,231.89" subtitle="+20.1% from last month" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Fundible Tockens</CardTitle>
                  <CardDescription> You made 265 sales this month. </CardDescription>
                </CardHeader>
                <CardContent> <RecentSales /> </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Non Fundible Tokens</CardTitle>
                  <CardDescription> You made 265 sales this month. </CardDescription>
                </CardHeader>
                <CardContent> <RecentSales /> </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}
