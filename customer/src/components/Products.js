import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data.products);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.slice(0, 8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
