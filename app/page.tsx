'use client'

import Image from "next/image"
import { Inter } from 'next/font/google'
import { MouseEventHandler, useCallback } from "react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'
import logo_dark from '../public/soldash_dark.png'
import logo_light from '../public/soldash_light.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const modalState = useWalletModal()
  const { publicKey, wallet, connect } = useWallet()

  if (publicKey) {
    router.push(`/${publicKey.toString()}`)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }
      if (!wallet) {
        modalState.setVisible(true)
      } else {
        connect().catch(() => { })
      }
    },
    [wallet, connect, modalState]
  )

  return (
    <>
      <div className="min-h-[60vh] lg:mx-72 my-28 grid grid-cols-2">
        <div className="bg-red-50 rounded-l-3xl p-20 border-2 border-black">
          <Image className="hidden sm:inline-flex mt-4" src={logo_dark} width="600" height="200" alt="logo" />
          <h2 className="mt-6 text-4xl leading-8 text-gray-600">
            Your Solana Dashboard
          </h2>
        </div>
        <div className="bg-blue-50 rounded-r-3xl flex align-middle justify-center flex-col">
          <Button size="lg" onClick={handleClick}>
            Connect wallet
          </Button>
        </div>
      </div>


      {/*  <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome To
          </h1>
          <Image className="hidden sm:inline-flex mt-4" src="/soldash_logo.png" width="400" height="100" alt="logo" />
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect your browser wallet or search any solana public wallet key to proceed
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" onClick={handleClick}>
              Connect wallet
            </Button>
          </div>
        </div>
      </div> */}
    </>
  )
}
