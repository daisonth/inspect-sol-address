'use client'
import { FC } from "react"
import dynamic from "next/dynamic";
import WalletContextProvider from "./WalletContextProvider";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletConnector: FC = () => {
  return (
    <WalletContextProvider>
      <WalletMultiButtonDynamic />
    </WalletContextProvider>
  )
}

export default WalletConnector
