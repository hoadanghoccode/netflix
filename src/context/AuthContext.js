import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    // Lấy giá trị từ LocalStorage khi khởi tạo
    const savedRole = localStorage.getItem("role");
    return savedRole ? JSON.parse(savedRole) : null;
  });

  const [userId, setUserId] = useState(() => {
    // Lấy giá trị từ LocalStorage khi khởi tạo
    const savedUserId = localStorage.getItem("userId");
    return savedUserId ? JSON.parse(savedUserId) : null;
  });

  useEffect(() => {
    // Lưu giá trị vào LocalStorage khi role thay đổi
    if (role) {
      localStorage.setItem("role", JSON.stringify(role));
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    // Lưu giá trị vào LocalStorage khi userId thay đổi
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const login = (role, id) => {
    setRole(role);
    setUserId(id);
  };

  const logout = () => {
    setRole(null);
    setUserId(null);
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
