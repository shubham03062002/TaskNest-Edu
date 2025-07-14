"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import api from "@/lib/axios";

export default function AuthModal({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const toggle = () => setIsLogin(!isLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student"); // default for registration
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", { email, password }); // ✅ NO role sent
        setMessage("🎉 Logged in successfully!");
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("role", res.data.role);

        setTimeout(() => {
          onClose();
          if(localStorage.getItem("role")==="admin"){
            router.push("/admin/home")
          }
          else{

            router.push("/dashboard");
          }
        }, 1000);
      } else {
        await api.post("/auth/register", { name, email, password, role }); // ✅ role sent
        setMessage("🎉 Registered successfully!");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-2xl font-bold mb-4 text-pink-600">
        {isLogin ? "🔐 Welcome Back!" : "🎉 Join the Adventure!"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="👤 Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            {/* ✅ Role selection only during registration */}
            <div className="flex justify-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-pink-500"
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-pink-500"
                />
                Admin
              </label>
            </div>
          </>
        )}

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-semibold py-2 rounded-xl hover:bg-pink-600 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login 🚀" : "Sign Up 🎈"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-gray-700">{message}</p>
        )}
      </form>

      <p className="text-center text-sm mt-4 text-gray-600">
        {isLogin ? "New here?" : "Already a member?"}{" "}
        <button
          type="button"
          onClick={toggle}
          className="text-pink-500 font-bold hover:underline"
        >
          {isLogin ? "Create an account" : "Log in"}
        </button>
      </p>
    </ModalWrapper>
  );
}
