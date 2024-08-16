import ProductForm from "../../components/ProductForm";
import Navbar from "../../components/Navbar";
import { Layout } from "antd";
import api from "../../lib/api";
import { useRouter } from 'next/router';

export default function NewProduct() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await api.delete("/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/login");
  };

  const { Content } = Layout;

  return (
    <Layout>
      <Navbar onLogout={handleLogout} />
      <Content style={{ padding: "48px 48px" }}>
        <ProductForm />
      </Content>
    </Layout>
  );
}