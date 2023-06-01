import Image from "next/image"
import { Search } from "./search"
import WalletConnector from "./WalletConnector"

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 mx-auto h-16 md:px-32 flex justify-between items-center md:gap-20 md:space-x-4 border-b border-black backdrop-blur ">
      <a href="/"><Image className="hidden sm:inline-flex" src="/soldash_dark.png" width="200" height="50" alt="logo" /></a>
      <Search />
      <WalletConnector />
    </div>
  )
}
