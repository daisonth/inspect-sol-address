import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { RecentSales } from "./components/recent-sales"
import HeadTitle from "./components/headTitle"
import TabSwitcher from "./components/TabSwitcher"
import DashCard from "./components/DashCards"

const getData = async () => {
  const res = await fetch("https://api.cms.com/....");
  return res.json();
};


export default function DashboardPage(params: any) {
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
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription> You made 265 sales this month. </CardDescription>
                </CardHeader>
                <CardContent> <RecentSales /> </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
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
