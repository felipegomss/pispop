"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Usuário autenticado com sucesso:", user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          PsiPop Admin
        </h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-4">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block mb-6">
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <Link href="/">
              <p className="text-blue-500 hover:underline mt-2 md:mt-0">
                Voltar para a Página Inicial
              </p>
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
