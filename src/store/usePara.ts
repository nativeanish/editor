import { create } from "zustand";
interface State {
  isBold: boolean;
  setBold: (e: boolean) => void;
  isUnderline: boolean;
  setUnderline: (e: boolean) => void;
  isStrikethrough: boolean;
  setStrikethrough: (e: boolean) => void;
  isItalic: boolean;
  setItalic: (e: boolean) => void;
  isHighlight: boolean;
  setHighlight: (e: boolean) => void;
  isCode: boolean;
  setCode: (e: boolean) => void;
  isSubscript: boolean;
  setSubscript: (e: boolean) => void;
  isSuperscript: boolean;
  setSuperscript: (e: boolean) => void;
}
const usePara = create<State>((set) => ({
  isBold: false,
  isUnderline: false,
  isStrikethrough: false,
  isItalic: false,
  isHighlight: false,
  isCode: false,
  isSubscript: false,
  isSuperscript: false,
  setBold(e) {
    set({ isBold: e });
  },
  setCode(e) {
    set({ isCode: e });
  },
  setUnderline(e) {
    set({ isUnderline: e });
  },
  setStrikethrough(e) {
    set({ isStrikethrough: e });
  },
  setItalic(e) {
    set({ isItalic: e });
  },
  setHighlight(e) {
    set({ isHighlight: e });
  },
  setSubscript(e) {
    set({ isSubscript: e });
  },
  setSuperscript(e) {
    set({ isSuperscript: e });
  },
}));
export default usePara;
