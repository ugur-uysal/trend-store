import { useCallback, useEffect, useState } from "react";
import "./Products.css";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProductsHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://my-pos-application-api.onrender.com/api/products/get-all"
      );
      if (response.status !== 200) throw new Error("Something went wrong!");

      const data = await response.json();

      const newData = data.map((item) => {
        return {
          id: item._id,
          name: item.title,
          amount: 1,
          ...item,
        };
      });
      setProducts(newData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => fetchProductsHandler, [fetchProductsHandler]);

  const productList = products.map((product) => (
    <ProductItem product={product} key={product.id} />
  ));

  let content = <p>Found no products!</p>;

  if (products.length > 0)
    content = <ul className="products">{productList}</ul>;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Loading...</p>;

  return <main className="products-wrapper">{content}</main>;
};

export default Products;
