import { create } from "zustand";

interface State {
  heading: string;
  set_heading: (e: string) => void;
}
const usePageHead = create<State>((set) => ({
  heading: "",
  set_heading: (e) => set({ heading: e }),
}));
export default usePageHead;
