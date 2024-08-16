import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../../../lib/api";
import { Layout } from "antd";
import Navbar from "../../../components/Navbar";
import ProductForm from "../../../components/ProductForm";

export default function EditProduct() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      const response = await api.get(`/api/products/${id}`);;
      let resProducts = response.data.product;
      setProduct(resProducts);
    }

    fetchProduct();
  }, [id]);

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

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <Navbar onLogout={handleLogout} />
      <Content style={{ padding: "48px 48px" }}>
        <ProductForm product={product} />
      </Content>
    </Layout>
  );
}
