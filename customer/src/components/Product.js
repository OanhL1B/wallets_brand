import { Link } from "react-router-dom";

const Product = ({ item }) => {
  console.log("item", item);
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full m-5">
      <Link to={`/product/${item._id}`}>
        <img src={item?.images?.thumb} alt="Product" />
      </Link>
      <div className="text-base text-[#4e2f30] font-normal">
        {item?.productName}
      </div>
      <div>{item?.price}</div>
    </div>
  );
};

export default Product;
