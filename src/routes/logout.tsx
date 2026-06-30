import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/logout")({
  head: () => ({
    meta: [{ title: "Logging out — CareerForge AI" }],
  }),
  component: LogoutPage,
});

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      navigate({ to: "/auth", replace: true });
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-muted-foreground font-medium">Logging out...</p>
    </div>
  );
}
