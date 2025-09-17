import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "reactflow/dist/style.css";
import useAuthStore from "@/stores/authStore";
import { LoadingPage } from "./pages/LoadingPage";
import router from "./routes";

export default function App() {
  useEffect(() => {
    // 处理url地址中的jwtoken参数适配的逻辑
    const authStore = useAuthStore.getState();

    const thirdPartyToken = sessionStorage.getItem('thirdPartyToken');
    if (thirdPartyToken) {
      authStore.setThirdPartyToken(thirdPartyToken);
    }

    authStore.setInitParams();
  }, []);

  window.addEventListener('message', (event) => {
    const { token, isShowHeader, parentId } = event.data;
    if (parentId === 'nsfocus') {
      useAuthStore.getState().setIframeData({
        token,
        isShowHeader,
      });

      if (token) {
        useAuthStore.getState().setThirdPartyToken(token);
      }
    }
  });

  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
