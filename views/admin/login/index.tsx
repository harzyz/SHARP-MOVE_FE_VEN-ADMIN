"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { SharpmoveInput, SharpmoveButton } from "@/components/ui";

export function AdminLoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // Mock login — always succeeds
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <SharpMoveLogo className="mx-auto text-2xl" />
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
              Admin Portal
            </span>
          </div>
          <p className="mt-3 text-sm text-foreground-muted">
            Sign in to the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <SharpmoveInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SharpmoveInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SharpmoveButton
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </SharpmoveButton>
        </form>

        <p className="mt-6 text-center text-xs text-foreground-muted">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
