import { create } from "zustand";

type _mark = null | "username" | "image";
interface State {
  loading: _mark;
  setLoading: (e: _mark) => void;
}
const useLoading = create<State>((set) => ({
  loading: null,
  setLoading(e) {
    set({ loading: e });
  },
}));
export default useLoading;
