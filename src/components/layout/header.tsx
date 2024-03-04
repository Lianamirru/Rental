const Header = () => {
  return (
    <section className="hero">
      <div className="heading--box">
        <h1 className="heading--main">Find your rhythm</h1>
        <h1 className="heading--sub">Rent musical instruments</h1>
        <a
          href="#instruments"
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

export default Header;
