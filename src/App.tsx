import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar />
        <section className="container mx-auto mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/post/:slug" element={<SinglePost />} />
          </Routes>
        </section>
      </BrowserRouter>
      <Footer />
    </main>
  );
}

export default App;
