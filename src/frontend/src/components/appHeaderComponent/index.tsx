import DataStaxLogo from "@/assets/DataStaxLogo.svg?react";
import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import ShadTooltip from "@/components/shadTooltipComponent";
import { CustomOrgSelector } from "@/customization/components/custom-org-selector";
import { CustomProductSelector } from "@/customization/components/custom-product-selector";
import {
  ENABLE_DATASTAX_LANGFLOW,
  ENABLE_NEW_LOGO,
} from "@/customization/feature-flags";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useTheme from "@/customization/hooks/use-custom-theme";
import { useEffect, useRef, useState } from "react";
import ForwardedIconComponent from "../genericIconComponent";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import FlowMenu from "./components/FlowMenu";

export default function AppHeader(): JSX.Element {
  const navigate = useCustomNavigate();
  const [activeState, setActiveState] = useState<"notifications" | null>(null);
  const lastPath = window.location.pathname.split("/").filter(Boolean).pop();
  const notificationRef = useRef<HTMLButtonElement | null>(null);
  const notificationContentRef = useRef<HTMLDivElement | null>(null);
  useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isNotificationButton = notificationRef.current?.contains(target);
      const isNotificationContent =
        notificationContentRef.current?.contains(target);

      if (!isNotificationButton && !isNotificationContent) {
        setActiveState(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-header-container flex h-[60px] w-full items-center justify-between gap-2 border-b px-5 py-2.5 dark:bg-background">
      {/* Left Section */}
      <div className={`flex items-center gap-2`}>
        <Button
          unstyled
          onClick={() => navigate("/")}
          className="mr-1 flex items-center"
          data-testid="icon-ChevronLeft"
        >
          {ENABLE_DATASTAX_LANGFLOW ? (
            <DataStaxLogo className="fill-black dark:fill-[white]" />
          ) : ENABLE_NEW_LOGO ? (
            <LangflowLogo className="w-12 h-12" />
          ) : (
            <span className="fill-black text-2xl dark:fill-white">⛓️</span>
          )}
          <span className="app-name text-2xl font-bold ml-2">风云卫AI智能体平台</span>
        </Button>
        {ENABLE_DATASTAX_LANGFLOW && (
          <>
            <CustomOrgSelector />
            <CustomProductSelector />
          </>
        )}
      </div>

      {/* Middle Section */}
      <div className="w-full flex-1 truncate md:max-w-[57%] lg:absolute lg:left-1/2 lg:max-w-[43%] lg:-translate-x-1/2 xl:max-w-[31%]">
        <FlowMenu />
      </div>

      {/* Right Section */}
      <div className={`flex items-center gap-2`}>
        {ENABLE_DATASTAX_LANGFLOW && (
          <>
            <ShadTooltip content="Docs" side="bottom" styleClasses="z-10">
              <Button
                variant="ghost"
                className="flex text-sm font-medium"
                onClick={() =>
                  window.open(
                    "https://docs.datastax.com/en/langflow/index.html",
                    "_blank",
                  )
                }
              >
                <ForwardedIconComponent
                  name="book-open-text"
                  className="side-bar-button-size h-[18px] w-[18px]"
                  aria-hidden="true"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Docs
                </span>
              </Button>
            </ShadTooltip>
            <ShadTooltip content="Settings" side="bottom" styleClasses="z-10">
              <Button
                data-testid="user-profile-settings"
                variant="ghost"
                className="flex text-sm font-medium"
                onClick={() => navigate("/settings")}
              >
                <ForwardedIconComponent
                  name="Settings"
                  className="side-bar-button-size h-[18px] w-[18px]"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Settings
                </span>
              </Button>
            </ShadTooltip>
            <Separator
              orientation="vertical"
              className="my-auto h-7 dark:border-zinc-700"
            />
          </>
        )}
        <ShadTooltip content="回到风云卫首页" side="bottom" styleClasses="z-10">
          <Button
            variant="link"
            className="flex text-xl font-medium"
            onClick={() => window.location.href = window.location.origin}
          >
            <ForwardedIconComponent
              name="Home"
              className="!h-[24px] !w-[24px] text-gray-200"
              aria-hidden="true"
            />
          </Button>
        </ShadTooltip>
        {/* <div className="flex">
          <AccountMenu />
        </div> */}
      </div>
    </div>
  );
}
