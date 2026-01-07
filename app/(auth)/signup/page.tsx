"use client";

import Image from "next/image";
import Link from "next/link";
import { useSignup } from "../../../src/customHooks/useSignup";

export default function SignupPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSignup,
  } = useSignup();

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#75a8db] px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-black">Register</h2>
          <p className="text-black mb-6">Create your account</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 backdrop-blur-3xl rounded-md border focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 backdrop-blur-3xl rounded-md border focus:outline-none focus:ring-1 focus:ring-gray-600 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-[#3383d3] text-white py-3 rounded-md font-semibold hover:bg-[#205992]"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
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
