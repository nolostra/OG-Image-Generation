import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  FetchOGImageParams,
  FetchOGImageResponse,
  fetchOGImage,
} from "../utils/fetchOGImage";
import usePostStore from "../stores/usePostStore";

export const useGenerateOgImage = () => {
  const { setOgImageUrl } = usePostStore();

  return useMutation({
    mutationFn: (params: FetchOGImageParams) => fetchOGImage(params),
    onSuccess: (data: { ogImageUrl: string }) => {
      toast.success("OG Image Created Successfully!");
      setOgImageUrl(data.ogImageUrl);
    },
    onError: (error: any) => {
      toast.error("Error generating OG image");
      console.error("Error generating OG image:", error);
    },
  });
};
