import { 
  SignedOut, 
  SignUpButton, 
  SignInButton, 
  UserButton, 
  SignedIn 
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="FinTrack Logo"
              height={80}
              width={240}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
        {/*dashboard to give space and add that (dashboard, new transaction) in center*/}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href={"/dashboard"} className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                  <LayoutDashboard size={18}/>
                  {/* if the screen size is greater than 768px then it will hide*/}
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
            
              <Link href={"/transaction/create"}>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700">
                  <PenBox size={18}/>
                  {/* if the screen size is greater than 768px then it will hide*/}
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="text-blue-800 hover:text-blue-900 font-medium text-sm sm:text-base px-4 py-2 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: {
                      width: "40px",
                      height: "40px"
                    }
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;