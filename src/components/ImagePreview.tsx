/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import usePostStore from "@/stores/usePostStore";

const ImagePreview: React.FC = () => {
  const { ogImageUrl } = usePostStore();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    ogImageUrl && (
      <div className="mt-6">
        <h2 className="text-xl font-bold">Generated OG Image</h2>
        <img src={ogImageUrl} alt="OG Image" className="mt-4 rounded max-w-full h-auto" />
        <div className="mt-4">
          <button
            onClick={() => copyToClipboard(ogImageUrl)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Copy Image URL
          </button>
          <button
            onClick={() => copyToClipboard(ogImageUrl)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Copy Image URL
          </button>
        </div>
        <div className="mt-2 bg-gray-100 p-2 rounded w-1/2 overflow-x-auto">
          <code className="whitespace-pre-wrap break-all">{ogImageUrl}</code>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

export default ImagePreview;
