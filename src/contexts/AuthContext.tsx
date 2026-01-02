import { createContext, type ReactNode } from "react";
import { useState, useEffect } from "react";
import type { UserAPIResponse } from "../dtos/user";

type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  remove: () => void;
};

const LOCAL_STORAGE_KEY = "@vfunhas";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data));
    setSession(data);
  }

  function remove() {
    setSession(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    window.location.assign("/");
  }

  useEffect(() => {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    if (user) {
      setSession(JSON.parse(user));
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ save, isLoading, session, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
