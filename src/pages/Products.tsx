import Loader from "@/components/Loader";
import { useAppSelector } from "@/store/redux-hooks";
import { selectCart } from "@/store/cart/cartSlice";
import { useGetAllProductsQuery } from "@/store/cart/cartApi";
import ProductItem from "@/components/ProductItem";
import { useEffect, useState } from "react";
import { getRandomItems } from "@/utils";
import { IProduct } from "@/types";

const Products = () => {
  const { products } = useAppSelector(selectCart);

  const { isError: productsError, isLoading: productsLoading } =
    useGetAllProductsQuery();

  const [combinedData, setCombinedData] = useState<IProduct[]>([]);

  useEffect(() => {
    const randomSelection = getRandomItems(products, 10);

    const combined = [
      ...products.map((item) => ({ ...item, isNew: false })),
      ...randomSelection,
    ];

    // Filter out duplicates and prioritize new items
    const uniqueArray = combined.reduce((acc: IProduct[], current) => {
      const existing = acc.find((item) => item.id === current.id);
      if (!existing) {
        acc.push(current);
      } else if (current.isNew && !existing.priceAfterDiscount) {
        acc = acc.map((item) => (item.id === current.id ? current : item));
      }
      return acc;
    }, []);

    setCombinedData(uniqueArray);
  }, [products]);

  if (productsLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <div className="mb-16 pt-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <p className="text-gray-500">Home</p>
          <span className="text-gray-500">/</span>
          <h4 className="font-medium">Products</h4>
        </div>
      </div>

      {productsError && (
        <p className="my-12 text-4xl font-semibold text-center text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {combinedData.length > 0 && (
        <div className="md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-12 grid grid-cols-1 gap-8">
          {combinedData.map((product) => (
            <ProductItem key={product.id} product={product} allProducts />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
