import {
  Hero,
  FlashSales,
  Categories,
  BestSelling,
  OurProducts,
  NewArrival,
} from "@/components";

const HomePage = () => {
  return (
    <div className="container pb-8 px-4 mx-auto">
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <OurProducts />
      <NewArrival />
    </div>
  );
};

export default HomePage;
