import { useEffect, useState } from "react";
import "./Products.css";
import ProductItem from "./ProductItem";
import FormInputs from "../Form/FormInputs";
import useHttp from "../../hooks/use-http";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest: fetchProducts } = useHttp();

  const transformProducts = (productArr) => {
    const newProducts = productArr.map((item) => {
      return {
        id: item._id,
        name: item.title,
        amount: 1,
        ...item,
      };
    });
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts(
      {
        url: "https://my-pos-application-api.onrender.com/api/products/get-all",
      },
      transformProducts
    );
  }, [fetchProducts]);

  const productList = products
    .map((product) => <ProductItem product={product} key={product.id} />)
    .reverse();

  let content = <p>Found no products!</p>;

  if (products.length > 0)
    content = <ul className="products">{productList}</ul>;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Loading...</p>;

  const productAddHandler = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: newProduct.title, img: newProduct.image, ...newProduct },
    ]);
  };

  return (
    <main className="products-wrapper">
      <FormInputs onAddProduct={productAddHandler} />
      {content}
    </main>
  );
};

export default Products;
