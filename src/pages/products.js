import { useState, useEffect } from "react";
import api from "../lib/api";
import { useRouter } from "next/router";
import { Table, Button, Tooltip, Popconfirm, Layout } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      router.push("/login");
    }
    async function fetchProducts() {
      api
        .get("/api/products")
        .then((res) => {
          if (res) {
            let resProducts = res.data.products;
            setProducts(resProducts);
          }
        })
        .catch(() => {
          toast.error(
            err.response ? err.response.data.error.message : err,
            options
          );
        });
    }

    fetchProducts();
  }, []);

  const { Content } = Layout;

  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

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

  const handleDelete = async (id) => {
    await api
      .delete(`/api/products/${id}`)
      .then((res) => {
        if (res) {
          setProducts(products.filter((product) => product.id !== id));
        }
      })
      .catch(() => {
        toast.error(
          err.response ? err.response.data.error.message : err,
          options
        );
      });
  };

  if (!isAuthenticated) {
    return null;
  }

  const columns = [
    {
      title: "Nombre del producto",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Descripción del producto",
      dataIndex: "description",
      key: "description",
      render: (description) => <span>{description}</span>,
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price}</span>,
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div className="table-actions">
          <Tooltip placement="bottom" title="Editar Producto">
            <Button
              type="dashed"
              icon={<EditTwoTone twoToneColor="#ffca2c" />}
              onClick={() => router.push(`/products/${id}/edit`)}
            ></Button>
          </Tooltip>
          <Popconfirm
            title="Eliminar producto"
            description="¿Esta seguro de eliminar este producto?"
            onConfirm={() => handleDelete(id)}
            okText="Si"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Eliminar Producto">
              <Button
                type="dashed"
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
              ></Button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Navbar onLogout={handleLogout} userName={userName} />
      <Content style={{ padding: "0 48px" }}>
        <div>
          <ToastContainer />
          <h1>Productos</h1>
          <Button type="primary" onClick={() => router.push("/products/new")} style={{marginBottom: "20px"}}>
            Nuevo Producto
          </Button>
          <Table dataSource={products} columns={columns} rowKey="id" />
        </div>
      </Content>
    </Layout>
  );
}
