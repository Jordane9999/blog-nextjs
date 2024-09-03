import InfinityTechnomogie from "@/public/Infinity-transparent.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
export default function Nav() {
  return (
    <nav className="max-w-[1200px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b border-gray-300 ">
      <div>
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            src={InfinityTechnomogie}
            alt="Logo de Infinity Technologie"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/auth/signIn"}>
          <Button>
            <User />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
