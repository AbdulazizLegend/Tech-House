import BestSels from "../../components/BestSels/BestSels";
import Discount from "../../components/Discount/Discount";
import Slider from "../../components/Slider/Slider";
import "./Home.css";

function Home() {
  return (
    <>
      <Slider />

      <BestSels/>
      <Discount/>
    </>
  );
}

export default Home;
