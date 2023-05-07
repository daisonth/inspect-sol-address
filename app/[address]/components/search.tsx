import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="h-9 w-48 lg:w-[300px] mx-3 border-black "
      />
    </div>
  )
}
