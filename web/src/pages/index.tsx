import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { CreateGiftPack } from "~/components/CreateGiftPack";
import { PackContents } from "~/components/PackContents";
import { WalletBalances } from "~/components/WalletBalances";
import { CLIENT } from "~/constants";
import { useGiftItems } from "~/contexts/GiftItemsContext";

export default function Home() {
  const account = useActiveAccount();
  const { selectedAssets } = useGiftItems();

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-20 p-4 w-full">
      <div className="mb-8">
        <ConnectButton client={CLIENT} />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Create a Gift Pack</h1>
      <PackContents />
      <CreateGiftPack 
        erc20s={selectedAssets.erc20} 
        erc721s={selectedAssets.erc721} 
        erc1155s={selectedAssets.erc1155} 
        ethAmount={selectedAssets.ethAmount} 
      />
      {account?.address && <WalletBalances address={account.address} />}
    </main>
  );
}
