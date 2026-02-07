import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const OfflineNotice = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 bg-foreground text-background p-3 text-center text-sm z-50 flex items-center justify-center gap-2"
    >
      <WifiOff className="w-4 h-4" />
      <span>Browsing archive. Connect for live availability.</span>
    </div>
  );
};

export default OfflineNotice;
