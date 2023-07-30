import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  console.log("products", products);
  return (
    <div className="grid grid-cols-4 gap-4 px-40 mt-10 bg-bg_product">
      {products?.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Products;
