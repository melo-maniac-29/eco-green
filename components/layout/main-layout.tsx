"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, X } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function MainLayout({ children, requireAuth = false }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
    
    if (requireAuth && !userIsLoggedIn && pathname !== "/login") {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [requireAuth, router, pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {isLoggedIn && (
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} z-40`} // Sidebar below the button
        >
          <Sidebar />
        </aside>
      )}

      <main
        className={`flex-1 transition-all duration-300 ${
          isLoggedIn && isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Sidebar Toggle Button (Always on Top) */}
        {isLoggedIn && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md 
            transition-colors hover:bg-blue-700"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Main Content */}
        <div className="p-6 mt-9 ml-4">
          
          {children}
        </div>
      </main>
    </div>
  );
}
