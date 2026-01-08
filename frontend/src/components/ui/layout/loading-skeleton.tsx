import { RefreshCw } from "lucide-react";

export const LoadingSkeleton = () => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <RefreshCw className="h-4 w-4 animate-spin" />
      <p>Fetching local weather...</p>
    </div>
  );
};