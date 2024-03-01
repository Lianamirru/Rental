import header_image from "../../images/header.png";

const Header = () => {
  return (
    <header className="header">
      <img className="header__image" src={header_image} />
      <div className="header__text-box">
        <h1 className="header__heading">
          <span className="header__heading--main">Find your rhythm</span>
          <span className="header__heading--sub">Rent musical instruments</span>
        </h1>
        <a href="#instruments" className="btn btn--red btn--animated">
          rent
        </a>
        <a href="#footer" className="btn btn--white btn--animated">
          contact
        </a>
      </div>
    </header>
  );
};

export default Header;
