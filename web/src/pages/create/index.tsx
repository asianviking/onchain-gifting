"use client";

import { useGiftItems } from "~/contexts/GiftItemsContext";

import { Card } from "~/components/ui/card";

import Image from "next/image";
import { CreateGiftForm } from "~/components/CreateGiftForm";
import { CreateGiftPackButton } from "~/components/CreateGiftPackButton";
import { useEffect, useState } from "react";
import { useModal } from "~/store/modals";
import { CreateGiftModal } from "~/components/modals/CreateGiftModal";

export default function CreatePage() {
  const { selectedAssets, hash } = useGiftItems();
  const [isCreated, setIsCreated] = useState(false);
  const { setCreateGiftDialogOpen } = useModal();

  console.log("#########selectedAssets:", selectedAssets);

  useEffect(() => {
    setCreateGiftDialogOpen(true);
  }, []);

  return (
    <div className="w-screen py-12">
      <CreateGiftModal />
      <Card className="mx-auto flex w-fit flex-col gap-6 bg-white/60 px-6 py-10 md:p-10 backdrop-blur-sm lg:flex-row">
        <div className="relative flex justify-center items-center h-[300px] w-auto md:h-[512px] md:w-[512px]">
          <Image
            src="/images/BASE_GLOBAL_BLUE.gif"
            alt="logo"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          {!isCreated && <CreateGiftForm />}
          <CreateGiftPackButton
            erc20s={selectedAssets.erc20}
            erc721s={selectedAssets.erc721}
            erc1155s={selectedAssets.erc1155}
            ethAmount={selectedAssets.ethAmount}
            hash={hash}
            isCreated={isCreated}
            setIsCreated={setIsCreated}
          />
        </div>
      </Card>
    </div>
  );
}
