import { useState } from "react";
import { useModal } from "~/store/modals";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "~/components/ui/dialog";

export function CreateGiftModal() {
  const { createGiftDialogOpen, setCreateGiftDialogOpen } = useModal();
  return (
    <Dialog open={createGiftDialogOpen} onOpenChange={setCreateGiftDialogOpen}>
      <DialogContent showOverlay={false} className="text-black md:max-w-screen-md ">
        <DialogHeader>
          <DialogTitle>Create Gift</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4 text-xs md:text-base">
          <p className="">
            We are Based Global Builders, and our New Year&apos;s resolution is
            to bring 1 billion users onchain!
          </p>
          <p className="">
            What&apos;s yours? Share your New Year&apos;s resolution with your
            friends, along with the gift of onchain, and help us achieve our
            goal!
          </p>
          <p className="text-sm"> Here&apos;s how it works:</p>
          <ul className="ml-5 list-disc">
            <li>
              Go to <a target="_blank" href="https://base.org/names" className="text-blue-500 underline">base.org/names</a>, create and mint a special basename for your
              friend.
            </li>
            <li>
              Create a gift package and add 5 USDC and don&apos;t forget to add
              the basename you created for your friend to add a little more
              magic
            </li>
            <li>
              Share the link with your friend via text, email, or any method you
              prefer.
            </li>
            <li>
              Include your New Year&apos;s resolution text with the link for
              added security.
            </li>
            <li>
              When your friend opens the package, they&apos;ll be asked to enter
              your New Year&apos;s resolution to claim the gift.
            </li>
            <li>
              Once verified, they&apos;ll be able to create a brand new wallet
              and claim the basename and the 5 USDC—completely gasless!
            </li>
          </ul>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
