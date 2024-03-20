import { create } from "zustand";

interface State {
  title: "Warning" | "Error" | null;
  description: string | null;
  setTitle: (title: "Warning" | "Error") => void;
  setDescription: (description: string) => void;
}
const useAlert = create<State>((set) => ({
  title: null,
  description: null,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
}));
export default useAlert;
