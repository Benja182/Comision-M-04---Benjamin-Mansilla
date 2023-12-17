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
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* ... Otras rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crear-post" element={<CreatePost />} />
          <Route path="/editar-post/:postId" element={<CreatePost />} />
          <Route path="/mis-posts" element={<Posts />} />
          <Route path="/post/:postId" element={<PostComment />} />
          <Route path="/" element={<Home />} />
          <Route element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
