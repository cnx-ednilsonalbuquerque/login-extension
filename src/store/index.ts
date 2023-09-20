import { create } from "zustand";

type LoginStore = {
  activeTab: string;
};

export const useLoginStore = create<LoginStore>(() => ({
  activeTab: "0",
}));
