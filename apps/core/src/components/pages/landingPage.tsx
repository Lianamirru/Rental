import { Hero } from "@packages/ui-kit";
import Instruments from "../layout/instruments";
import About from "../layout/about";
import Slider from "../layout/slider";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Instruments />
      <Slider />
    </>
  );
};

export default LandingPage;
