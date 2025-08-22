import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostPage } from "./pages/PostPage";
import { RegisterPage } from "./pages/RegisterPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
      {/*<h1>Hello World</h1>*/}
    </>
  );
}

export default App;
