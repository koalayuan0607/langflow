// authStore.js
import { LANGFLOW_ACCESS_TOKEN } from "@/constants/constants";
import { AuthStoreType } from "@/types/zustand/auth";
import { Cookies } from "react-cookie";
import { create } from "zustand";

const cookies = new Cookies();
const useAuthStore = create<AuthStoreType>((set, get) => ({
  isAdmin: false,
  isAuthenticated: !!cookies.get(LANGFLOW_ACCESS_TOKEN),
  accessToken: cookies.get(LANGFLOW_ACCESS_TOKEN) ?? null,
  userData: null,
  autoLogin: null,
  apiKey: cookies.get("apikey_tkn_lflw"),
  authenticationErrorCount: 0,
  iframeData: {
    token: "",
    isShowHeader: true,
  },
  thirdPartyToken: null,

  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUserData: (userData) => set({ userData }),
  setAutoLogin: (autoLogin) => set({ autoLogin }),
  setApiKey: (apiKey) => set({ apiKey }),
  setAuthenticationErrorCount: (authenticationErrorCount) =>
    set({ authenticationErrorCount }),

  setIframeData: (iframeData) => set({ iframeData }),

  setThirdPartyToken: (thirdPartyToken: string | null) => {
    set({ thirdPartyToken: thirdPartyToken });
    sessionStorage.setItem('thirdPartyToken', thirdPartyToken || '');
  },

  setInitParams: () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const paramsData = Object.fromEntries(urlSearchParams.entries());

    if (paramsData?.jwtoken) {
      get().setThirdPartyToken(paramsData.jwtoken);

      // 删除 url 中的 jwtoken
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('jwtoken');
      const newUrlString = newUrl.toString();
      setTimeout(() => {
        window.history.replaceState({}, '', newUrlString);
      }, 1000);
    }
  },

  logout: async () => {
    get().setIsAuthenticated(false);
    get().setIsAdmin(false);

    // 清除thirdPartyToken
    sessionStorage.removeItem('thirdPartyToken');

    set({
      isAdmin: false,
      userData: null,
      accessToken: null,
      isAuthenticated: false,
      autoLogin: false,
      apiKey: null,
      thirdPartyToken: null,
    });
  },
}));

export default useAuthStore;
