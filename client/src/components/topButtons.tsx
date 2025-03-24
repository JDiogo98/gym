import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { BookmarkCheckIcon, ClipboardIcon, HouseIcon } from "lucide-react";
import { Button } from "./ui/button";
import AlternativeRegistration from "./RegistationPage/AlternativeRegistation";
import AuthButton from "./authButton";
import { useAuth } from "@/Auth";

export const TopButtons = ({ pathname }: { pathname: string }) => {
  const { isAuth } = useAuth();

  return (
    <div className="absolute top-0 right-0 m-4 flex gap-2 z-50">
      <ModeToggle />
      {pathname !== "/" ? (
        <Link href="/">
          <Button variant="outline">
            <BookmarkCheckIcon className="w-6 h-6" />
            <span className="hidden md:flex">Registar Treino</span>
          </Button>
        </Link>
      ) : (
        <div className="flex gap-2">
          <div>
            {/* <AlternativeRegistration /> */}
            <Button variant="outline" className="">
              <ClipboardIcon className="w-4 h-4" />
              <span className="hidden md:flex">Registo Alternativo</span>
            </Button>
          </div>
          {isAuth && (
            <div>
              <Link href={isAuth ? "/dashboard" : "/login"}>
                <Button variant="outline">
                  <HouseIcon className="w-6 h-6 md:mr-2" />
                  <span className="hidden md:flex">Dashboard</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
      {pathname !== "/login" && pathname !== "/register" && <AuthButton />}
    </div>
  );
};
