import { HashLink } from "react-router-hash-link";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="img"></div>
      <div className="heading--box">
        <h1 className="heading--main">Find your rhythm</h1>
        <h1 className="heading--sub">Rent musical instruments</h1>
        <HashLink
          smooth
          to="#instruments-section"
          className="btn-hero btn-hero--rent btn-hero--animated"
        >
          rent
        </HashLink>
        <HashLink
          smooth
          to="#footer"
          className="btn-hero btn-hero--contact btn-hero--animated"
        >
          contact
        </HashLink>
      </div>
    </section>
  );
};

export default Hero;
