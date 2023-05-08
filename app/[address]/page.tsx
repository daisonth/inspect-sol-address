import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { RecentSales } from "./components/recent-sales"
import HeadTitle from "./components/headTitle"
import TabSwitcher from "./components/TabSwitcher"
import DashCard from "./components/DashCards"
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();


async function getTokenBalancesByOwner(add: string) {
  const { data } = await axios.post(
    "https://rest-api.hellomoon.io/v0/token/balances-by-owner",
    {
      ownerAccount: add
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.Bearer}`,
      },
    }
  );
  const mintaddresses = data.map((item: any) => item.mint)
  return mintaddresses
}

async function getMetaplexMetadata(add: string[]) {
  const { data } = await axios.post(
    "https://rest-api.hellomoon.io/v0/nft/mint_information",
    {
      "nftMint": add
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.Bearer}`,
      },
    }
  );
  const metadataJson = data.data.map((item: any) => item.nftMetadataJson)
  return metadataJson
}

export default async function DashboardPage({ params }: any) {
  const mintaddresses = await getTokenBalancesByOwner(params.address)
  const tockenmetaDatas = await getMetaplexMetadata(mintaddresses)

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
