"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (adminOnly && !user?.is_admin) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, user, adminOnly, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (adminOnly && !user?.is_admin) return null;

  return <>{children}</>;
}