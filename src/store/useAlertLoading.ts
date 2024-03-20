import { create } from "zustand";

interface State {
  show: boolean;
  set_show: (e: boolean) => void;
  title: string;
  setTitle: (e: string) => void;
  description: string;
  setDescription: (e: string) => void;
}
const useAlertLoading = create<State>((set) => ({
  show: false,
  title: "",
  set_show(e) {
    set({ show: e });
  },
  setTitle(e) {
    set({ title: e });
  },
  description: "",
  setDescription(e) {
    set({ description: e });
  },
}));
export default useAlertLoading;
