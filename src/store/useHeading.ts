import { HeadingTagType } from "@lexical/rich-text";
import { create } from "zustand";
export type _h = HeadingTagType | "paragraph" | "quote" | "code";
interface State {
  hp: _h;
  setHp: (e: _h) => void;
}
const useHeading = create<State>((set) => ({
  hp: "paragraph",
  setHp(e) {
    set({ hp: e });
  },
}));
export default useHeading;
