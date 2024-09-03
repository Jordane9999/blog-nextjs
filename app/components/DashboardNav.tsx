import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings, Plus } from "lucide-react";
import { auth } from "@/db/configFirebase";
export default function DashboardNav() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };
  return (
    <nav className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Link href={"/dashboard"}>
          <Button>
            <Settings className="w-4" />
          </Button>
        </Link>
        <Link href={"/dashboard/createArticle"}>
          <Button>
            <Plus className="w-4" />
          </Button>
        </Link>
      </div>
      <Button onClick={handleSignOut}>
        <LogOut className="w-4" />
      </Button>
    </nav>
  );
}
