import Banner from "@/components/banner/Banner";
import HomePage from "@/components/banner/Home";
import dotenv from "dotenv";

export default function Home() {
  dotenv.config();
  return (
    <div>
      <HomePage />
      <Banner />
    </div>
  );
}
