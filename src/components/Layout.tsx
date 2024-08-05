import Head from 'next/head';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <meta property="og:image" content="/default-og-image.png" />
      </Head>
      <div className="container mx-auto p-4">
        {children}
      </div>
    </>
  );
};

export default Layout;
