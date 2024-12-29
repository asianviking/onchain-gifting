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
export default function Home() {
  return (
    <>
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <GiftHomeAnimation />
        <h1 style={{ fontFamily: "Inter", fontWeight: "800" }} className="-mt-10 w-[80%] text-center text-[72px] font-extrabold leading-tight text-white md:text-[80px]">
          Bring Them <span className="text-blue-500">Onchain</span> This New
          Year!
        </h1>
        <div className="my-5 flex items-center justify-center gap-4">
          <ClaimPasswordInputDialog />
          <Link href="/create">
            <Button
              size={"lg"}
              className={`flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-base font-bold text-white hover:bg-blue-700 md:w-[160px]`}
              variant="default"
            >
              Create a Gift
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function ClaimPasswordInputDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="bg-white/20 font-sans text-base text-white hover:bg-white/10 hover:text-white md:w-[160px]"
          variant="outline"
        >
          Claim a Gift
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          className="w-full max-w-sm"
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
            <DialogTitle>Claim a Gift</DialogTitle>
            <DialogDescription>
              Enter the password to claim your gift
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700`}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}