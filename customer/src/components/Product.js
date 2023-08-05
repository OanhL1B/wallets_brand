import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-1 m-5 ">
      <Link to={`/product/${item._id}`}>
        <img src={item?.thumb} alt="Product" />
      </Link>
      <div className="text-base text-[#4e2f30] font-normal rounded-lg">
        {item?.productName}
      </div>
      <div className="text-lg font-semibold">{item?.price}₫</div>
    </div>
  );
};

export default Product;
