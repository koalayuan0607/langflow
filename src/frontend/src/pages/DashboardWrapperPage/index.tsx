import AppHeader from "@/components/appHeaderComponent";
import useTheme from "@/customization/hooks/use-custom-theme";
import useAuthStore from "@/stores/authStore";
import { Outlet } from "react-router-dom";

export function DashboardWrapperPage() {
  useTheme();
  const { iframeData } = useAuthStore();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {iframeData.isShowHeader && <AppHeader />}
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
