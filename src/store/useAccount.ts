import { create } from "zustand";

interface State {
  account: null | boolean;
  set_Account: (e: boolean) => void;
  name: null | string;
  set_name: (e: string) => void;
  username: null | string;
  set_username: (e: string) => void;
  img: null | string;
  set_img: (e: string) => void;
  follower: null | Array<{ address: string }>;
  set_follower: (e: Array<{ address: string }>) => void;
  following: null | Array<{ address: string }>;
  set_following: (e: Array<{ address: string }>) => void;
  articles: null | Array<string>;
  set_articles: (e: Array<string>) => void;
}

const useAccount = create<State>((set) => ({
  account: null,
  set_Account(e) {
    set({ account: e });
  },
  name: null,
  set_name(e) {
    set({ name: e });
  },
  username: null,
  set_username(e) {
    set({ username: e });
  },
  img: null,
  set_img(e) {
    set({ img: e });
  },
  follower: null,
  set_follower(e) {
    set({ follower: e });
  },
  following: null,
  set_following(e) {
    set({ following: e });
  },
  articles: null,
  set_articles(e) {
    set({ articles: e });
  },
}));
export default useAccount;
