import { create } from "zustand";
interface State {
  isNumber: boolean;
  setNumber: (e: boolean) => void;
  isBullet: boolean;
  setBullet: (e: boolean) => void;
}
const useList = create<State>((set) => ({
  isNumber: false,
  isBullet: false,
  setNumber(e) {
    set({ isNumber: e });
  },
  setBullet(e) {
    set({ isBullet: e });
  },
}));
export default useList;
