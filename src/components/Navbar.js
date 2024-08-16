import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";

const { Header } = Layout;

const Navbar = ({ onLogout }) => {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Menu.Item key="1" onClick={() => router.push("/products")}>
          Productos
        </Menu.Item>
        <Menu.Item key="2" onClick={() => router.push("/products/new")}>
          Nuevo Producto
        </Menu.Item>
      </Menu>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "white", marginRight: "16px" }}>
          Bienvenido, {userName}
        </span>
        <Button type="primary" onClick={onLogout}>
          Cerrar Sesión
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;