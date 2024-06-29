import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Blog = () => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <Nav />
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        <span className="w-fit h-fit text-black text-3xl">Blog page</span>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
