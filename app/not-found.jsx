import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <div className="text-center space-y-8 max-w-md">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-extralight text-blue-300/20 -z-10 transform translate-x-1 translate-y-1">
            404
          </div>
        </div>
        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-blue-100 tracking-wide">
            Lost in space
          </h2>
          <p className="text-blue-200 leading-relaxed">
            The page you&apos;re seeking has drifted away into the digital cosmos.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 py-4">
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-blue-100 rounded-full animate-bounce delay-300"></div>
        </div>
        {/* Action button */}
        <div className="pt-2">
          <Link href="/">
            <Button 
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-400/30"
            >
              Return Home
            </Button>
          </Link>
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-blue-400/10 blur-3xl -z-20 rounded-full"></div>
      </div>
    </div>
  );
}