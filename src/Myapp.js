import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Detailpage from "./components/Detailpage";
import Film from "./components/Film";
import Search from "./components/Search";
import Addtoteam from "./components/Addtoteam";
import Login from "./components/Login";
import Management from "./components/Management";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import Blogpage from "./components/Blogpage";
import Detailblog from "./components/Detailblog";
import Listfilm from "./components/Listfilm";
import Listfilmbycountry from "./components/Listfilmbycountry";
import Favourite from "./components/Favourite";
import MyButton from "./components/MyButton";

const Myapp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="film/:name" element={<Detailpage />} />
        <Route path="film/:name/watch" element={<Film />} />
        <Route path="film/:name/search" element={<Search />} />
        <Route path="/add" element={<Addtoteam />} />
        <Route path="/login" element={<Login />} />
        <Route path="/managerment" element={<Management />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/film" element={<Listfilm />} />
        <Route path="/blogdetail/:id" element={<Detailblog />} />
        <Route path="/country" element={<Listfilmbycountry />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/MyButton" element={<MyButton />} />
      </Routes>
    </>
  );
};

export default Myapp;
