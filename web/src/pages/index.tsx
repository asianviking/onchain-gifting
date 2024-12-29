import { GiftHomeAnimation } from "~/components/GiftHomeAnimation";
import HomeContent from "~/components/HomeContent";

export default function Home() {
  return (
    <>
      <div className="flex h-[80vh] w-full flex-col items-center justify-start">
        <GiftHomeAnimation />
        <HomeContent />
      </div>
    </>
  );
}

