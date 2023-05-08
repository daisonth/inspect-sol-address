import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

function DashCard({ ...props }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {props.title}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.amount}</div>
        <p className="text-xs text-muted-foreground">
          {props.subtitle}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashCard
