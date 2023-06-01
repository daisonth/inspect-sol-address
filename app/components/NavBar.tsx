import Image from "next/image"
import { Search } from "./search"
import WalletConnector from "./WalletConnector"
import Link from 'next/link'

function NavBar() {
  return (
    // <div className="fixed inset-x-0 top-0 z-50 border-b border-black">
    // <div className="flex h-16 items-center px-4">
    <div className="sticky top-0 z-50 mx-auto h-16 md:px-32 flex justify-between items-center md:gap-20 md:space-x-4 border-b border-black backdrop-blur ">
      <a href="/"><Image className="hidden sm:inline-flex" src="/soldash_logo.png" width="200" height="50" alt="logo" /></a>
      <Search />
      <WalletConnector />
    </div>
    // </div >
    // </div>
  )
}

export default NavBar;
