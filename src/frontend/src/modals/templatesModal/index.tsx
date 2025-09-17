import ForwardedIconComponent from "@/components/genericIconComponent";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { Category } from "@/types/templates/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { newFlowModalPropsType } from "../../types/components";
import BaseModal from "../baseModal";
import GetStartedComponent from "./components/GetStartedComponent";
import TemplateContentComponent from "./components/TemplateContentComponent";
import { Nav } from "./components/navComponent";

export default function TemplatesModal({
  open,
  setOpen,
}: newFlowModalPropsType): JSX.Element {
  const [currentTab, setCurrentTab] = useState("get-started");
  const addFlow = useAddFlow();
  const navigate = useCustomNavigate();
  const { folderId } = useParams();

  // Define categories and their items
  const categories: Category[] = [
    {
      title: "模板库",
      items: [
        { title: "快速入门", icon: "SquarePlay", id: "get-started" },
        { title: "所有模板", icon: "LayoutPanelTop", id: "all-templates" },
      ],
    },
    {
      title: "使用场景",
      items: [
        { title: "智能助手", icon: "BotMessageSquare", id: "assistants" },
        { title: "分类任务", icon: "Tags", id: "classification" },
        { title: "代码编程", icon: "TerminalIcon", id: "coding" },
        {
          title: "内容生成",
          icon: "Newspaper",
          id: "content-generation",
        },
        { title: "问答系统", icon: "Database", id: "q-a" },
        // { title: "文本摘要", icon: "Bot", id: "summarization" },
        // { title: "网页抓取", icon: "CodeXml", id: "web-scraping" },
      ],
    },
    {
      title: "技术方法",
      items: [
        { title: "提示工程", icon: "MessagesSquare", id: "chatbots" },
        { title: "检索增强", icon: "Database", id: "rag" },
        { title: "智能代理", icon: "Bot", id: "agents" },
      ],
    },
  ];

  return (
    <BaseModal size="templates" open={open} setOpen={setOpen} className="p-0">
      <BaseModal.Content overflowHidden className="flex flex-col p-0">
        <div className="flex h-full">
          <SidebarProvider width="15rem" defaultOpen={false}>
            <Nav
              categories={categories}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <main className="flex flex-1 flex-col gap-4 overflow-hidden p-6 md:gap-8">
              {currentTab === "get-started" ? (
                <GetStartedComponent />
              ) : (
                <TemplateContentComponent
                  currentTab={currentTab}
                  categories={categories.flatMap((category) => category.items)}
                />
              )}
              <BaseModal.Footer>
                <div className="flex w-full flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col items-start justify-center">
                    <div className="font-semibold">从零开始</div>
                    <div className="text-sm text-muted-foreground">
                      创建一个全新的空白智能体
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      addFlow().then((id) => {
                        navigate(
                          `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
                        );
                      });
                      track("New Flow Created", { template: "Blank Flow" });
                    }}
                    size="sm"
                    data-testid="blank-flow"
                    className="shrink-0"
                  >
                    <ForwardedIconComponent
                      name="Plus"
                      className="h-4 w-4 shrink-0"
                    />
                    创建空白智能体
                  </Button>
                </div>
              </BaseModal.Footer>
            </main>
          </SidebarProvider>
        </div>
      </BaseModal.Content>
    </BaseModal>
  );
}
