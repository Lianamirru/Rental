const Hero = () => {
  return (
    <section className="hero-section">
      <div className="img"></div>
      <div className="heading--box">
        <h1 className="heading--main">Find your rhythm</h1>
        <h1 className="heading--sub">Rent musical instruments</h1>
        <a
          href="#instruments-section"
          className="btn-hero btn-hero--rent btn-hero--animated"
        >
          rent
        </a>
        <a
          href="#footer"
          className="btn-hero btn-hero--contact btn-hero--animated"
        >
          contact
        </a>
      </div>
    </section>
  );
};

export default Hero;
