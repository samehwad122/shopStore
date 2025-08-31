import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) setUsers(JSON.parse(storedUsers));

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const register = (data) => {
    const exists = users.find((u) => u.email === data.email);
    if (!exists) {
      const newUsers = [...users, data];
      setUsers(newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    }
    return false;
  };

  const login = (data) => {
    const exists = users.find(
      (u) => u.email === data.email && u.password === data.password
    );
    if (exists) {
      setUser(exists);
      localStorage.setItem("user", JSON.stringify(exists));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
