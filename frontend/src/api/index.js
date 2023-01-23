import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const getProducts = () => api.get(`/products/`);

const getProduct = (id) => api.get(`/products/${id}`);

const addProduct = (body) => api.post("/products", body);

const updateProduct = (id, body) => api.put(`/products/${id}`, body);

const deleteProduct = (id) => api.delete(`/products/${id}`);

const apis = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default apis;
