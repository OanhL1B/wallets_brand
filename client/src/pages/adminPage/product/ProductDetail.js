import React from "react";
import ReactModal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const ProductDetail = ({ product, isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="items-center justify-center">
        <div className="w-[1400px] min-h-[100px] py-7 px-7 text-center bg-primary bg-opacity-10 rounded-md  shadow-md mx-auto">
          <div className="flex mt-10 mb-10 gap-x-16">
            <div className="flex flex-col">
              <h1>thumbnail</h1>
              <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 object-cover mx-auto mb-2">
                <img
                  src={product?.thumb}
                  alt="Thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <h1>Images</h1>
              <div className="flex items-center ml-5 gap-x-6">
                <div className="flex gap-x-3">
                  {product?.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 mb-2"
                    >
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="flex flex-row font-sans gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col font-sans gap-y-5"
                style={{ width: "130px", textAlign: "left" }}
              >
                <span className="font-sans">Product</span>
                <span className="font-sans">Category</span>
                <span className="font-sans">Meterial</span>
                <span className="font-sans">Size</span>
                <span className="font-sans">Design</span>
                <span className="font-sans">Description</span>
                <span className="font-sans">Price</span>
                <span className="font-sans">Quantity</span>
                <span className="font-sans">Status</span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "250px", textAlign: "left" }}
              >
                <span>{product.productName}</span>
                <span>{product.category}</span>
                <span>{product.material}</span>
                <span>{product.size}</span>
                <span>{product.design}</span>
                <span>{product.description}</span>
                <span>{product.price}</span>
                <span>{product.quantity}</span>
                <span>
                  {product.isActive === true ? "Available" : "Discontinued"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              // className={classes.adminFormClearButton}
              type="button"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductDetail;
