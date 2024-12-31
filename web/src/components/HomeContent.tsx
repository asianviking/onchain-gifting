import Link from "next/link";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { GiftHomeAnimation } from "~/components/GiftHomeAnimation";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// New component for the main content
export default function HomeContent() {
  return (
    <>
      <h1 className="-mt-10 text-center text-[48px] font-extrabold leading-tight text-white md:w-[80%] md:text-[96px]">
        Bring Them <span className="text-blue-600">Onchain</span> This New Year!
      </h1>
      <div className="my-5 flex items-center justify-center gap-4">
        <ClaimPasswordInputDialog />
        <Link href="/create">
          <Button
            size={"lg"}
            className={`flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-base font-bold text-white hover:bg-blue-700 md:w-[160px]`}
            variant="default"
          >
            Create Gift
          </Button>
        </Link>
      </div>
    </>
  );
}

const ClaimPasswordInputDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-base font-bold md:w-[160px]`}
          variant="secondary"
        >
          Claim Gift
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-screen-sm">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const password = new FormData(form).get("password") as string;
            if (password) {
              void router.push(`/claim/${password}`);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Claim your gift</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p className="text-sm">
                Your friend sent your gift? Enter the secret phrase and start
                your onchain journey!
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-sm">Here’s how it works: </p>
                <ul className="ml-4 list-disc">
                  <li>
                    Type in the secret phrase (your friend’s New Year’s
                    resolution) to unlock the package.
                  </li>
                  <li>
                    Once the package is unlocked, you’ll be prompted to create a
                    wallet if you don’t already have one. Don’t worry—it’s
                    quick, easy, and completely free!
                  </li>
                  <li>
                    Claim your gift of 5 USDC (equal to $5) along with a special
                    Basename created just for you!
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="w-full gap-4 py-4">
            <div className="items-center gap-4">
              <Label htmlFor="password" className="text-right text-xs">
                Secret Phrase
              </Label>
              <Input id="password" name="password" className="col-span-3" />
              <p className="ml-1 mt-2 text-xs text-red-500">
                Important: The secret phrase is unique to your gift, so keep it
                safe and only use it to unlock this package.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700`}
              type="submit"
            >
              Claim Gift
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
