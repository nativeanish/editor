import { create } from "zustand";

type _m = "intro" | "name" | "username" | "image" | "final";
interface State {
  data: _m;
  set: (e: _m) => void;
}
const useIntro = create<State>((set) => ({
  data: "intro",
  set: (e: _m) => set({ data: e }),
}));

export default useIntro;
