/* eslint-disable @next/next/no-img-element */
import { useGenerateOgImage } from "@/hooks/useGenerateOgImage";
import usePostStore from "@/stores/usePostStore";
import { ChangeEvent } from "react";

const Form: React.FC = () => {
  const { title, content, image, setTitle, setContent, setImage } =
    usePostStore();
  const mutation = useGenerateOgImage();
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File Object:--", file); // Logs the File (Blob) object

      // Convert the Blob to a Data URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Data URL:", reader.result); // Logs the Data URL
        setImage(reader.result as unknown as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateOgImage = () => {
    const params = { title, content, image };
    mutation.mutate(params);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Create a New Post
      </h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your post"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here"
            rows={6}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm file:border file:bg-orange-50 file:text-orange-700"
            type="file"
            onChange={handleImageUpload}
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-full max-h-60 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="button"
          onClick={generateOgImage}
        >
          Generate OG Image
        </button>
      </form>
    </div>
  );
};

export default Form;
