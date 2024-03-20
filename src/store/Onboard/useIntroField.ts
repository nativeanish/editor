import { create } from "zustand";
type _type = "svg" | "base64";
interface State {
  data: string | null;
  type: _type;
  setup: (e: string, f: _type) => void;
  name: string;
  set_name: (e: string) => void;
  username: string;
  set_username: (e: string) => void;
}
const useIntroField = create<State>((set) => ({
  type: "svg",
  data: null,
  setup: (e, f) => {
    set({ data: e });
    set({ type: f });
  },
  name: "",
  set_name: (e) => set({ name: e }),
  username: "",
  set_username: (e) => set({ username: e }),
}));
export default useIntroField;
