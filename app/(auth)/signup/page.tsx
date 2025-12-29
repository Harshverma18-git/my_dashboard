"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

   const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful. Please login.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
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
                        {/* <button disabled={loading}>
                          {loading ? "Creating account..." : "Sign Up"}
                        </button> */}
                      </form>
            
                      <p className="text-center text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-semibold">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
            
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
