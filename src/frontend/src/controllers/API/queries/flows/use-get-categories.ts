import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { SIDEBAR_CATEGORIES } from "@/utils/styleUtils";

export interface CategoryGroup {
  name: string;
  display_name: string;
  components: Array<{
    name: string;
    display_name: string;
    icon: string;
  }>;
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<CategoryGroup[]>(getURL("ALL_DISPLAY"));
      const data = response.data || [];
      const savedItem = SIDEBAR_CATEGORIES.find(item => item.name === 'saved_components');
      if (savedItem) {
        return [savedItem, ...data];
      }
      return data;
    },
    refetchOnWindowFocus: false,
  });
};