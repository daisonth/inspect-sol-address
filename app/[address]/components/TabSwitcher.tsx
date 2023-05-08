import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabSwitcher() {
  return (
    <div className="flex items-center space-x-2">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            NFTs
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Tockens
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Transactions
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabSwitcher;
