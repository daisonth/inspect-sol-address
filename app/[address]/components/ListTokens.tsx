import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TokenList({ ...props }: any) {
  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={props.image} alt="Avatar" />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{props.name}</p>
          <p className="hidden md:flex text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">{props.amount}</div>
      </div>
    </div>
  )
}
