import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Products = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data.retObj);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  const activeProducts = products.filter((item) => item?.isActive);

  const filteredProducts = selectedCategoryId
    ? activeProducts.filter(
        (product) => product.category._id === selectedCategoryId
      )
    : activeProducts;

  return (
    <div className="grid grid-cols-4 gap-4 px-40 mt-10">
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Products;
