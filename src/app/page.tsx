import Banner from "@/components/banner/Banner";
import HomePage from "@/components/banner/Home";
import dotenv from "dotenv";

export default function Home() {
  dotenv.config();
  return (
    <div className="ooverscroll-contain"> 
      <HomePage />
      <Banner />
    </div>
  );
}
