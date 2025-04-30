"use client";

import { authState } from "@/store/auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSnapshot } from "valtio";

export default function Home() {
  const { data: session } = useSession();
  const snap = useSnapshot(authState);

  if (session && session.user) {
    authState.user = session.user || null;
    return (
      <div className="p-4">
        <p>Привет, {session.user.name}</p>
        <img src={session.user.image!} className="w-16 h-16 rounded-full" />
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Добро пожаловать</h1>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Войти через Google
      </button>
      <p className="mt-2 text-sm text-gray-500">Apple скоро будет доступен</p>
    </div>
  );
}
