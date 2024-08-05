import { create } from "zustand";

interface PostState {
  title: string;
  content: string;
  image: string | null;
  ogImageUrl: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImage: (image: string | null) => void;
  setOgImageUrl: (ogImageUrl: string) => void;
}

const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  image: null,
  ogImageUrl: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImage: (image) => set({ image }),
  setOgImageUrl: (ogImageUrl) => set({ ogImageUrl }),
}));

export default usePostStore;
