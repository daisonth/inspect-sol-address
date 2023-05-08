import Image from "next/image"
import { Search } from "./search"
import WalletConnector from "./WalletConnector"

function NavBar() {
  return (
    <div className="border-b border-black">
      <div className="flex h-16 items-center px-4">
        <div className="mx-auto flex items-center md:gap-20 space-x-4">
          <Image className="hidden sm:inline-flex" src="/soldash_logo.png" width="200" height="50" alt="logo" />
          <Search />
          <WalletConnector />
        </div>
      </div>
    </div>
  )
}

export default NavBar;
