import Form from '../components/Form';
import ImagePreview from '../components/ImagePreview';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <Form />
      <ImagePreview />
    </div>
  );
};

export default Home;
