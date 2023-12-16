import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import CreatePost from "./views/CreatePost";
import PostComment from "./views/PostComments";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Posts from "./views/Posts";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* ... Otras rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crear-post" element={<CreatePost />} />
          <Route path="/mis-posts" element={<Posts />} />
          <Route path="/post/:postId" element={<PostComment />} />
          <Route path="/" element={<Home />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
