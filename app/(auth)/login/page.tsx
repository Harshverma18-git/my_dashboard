"use client";

import { useState } from "react";
import { supabase } from "../../../src/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side – Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#75a8db] px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-black">Log in</h2>
          <p className="text-black mb-6">Login to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full p-3 backdrop-blur-3xl rounded-md border focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>


            <button
              type="submit"
              className="w-full bg-[#3383d3] text-white py-3 rounded-md font-semibold hover:bg-[#205992]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="w-full border py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 hover:text-black"
            >
              <span className="text-sm font-medium text-black">Sign in with Google</span>
            </button>
            </form>

            <p className="text-sm text-center mt-6 text-black">
                If you don’t have an account you can{" "}
           <Link href="/signup" className="text-blue-600 font-medium">
                register here!
            </Link>
            </p>
        </div>
      </div>

      {/* Right Side – Illustration */}
     <div className="hidden md:flex w-1/2 bg-[#3383d3] items-center justify-center">
        <Image
            src="/man_login.webp"
            alt="Login Illustration"
            width={450}
            height={450}
            className="object-contain"
            priority
        />
     </div>
    </div>
  );
}