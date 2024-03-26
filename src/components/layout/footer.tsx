const Footer = () => {
  return (
    <footer className="primary-footer ">
      <div className="primary-footer-wrapper">
        <div className="primary-footer-logo-social">
          <ul className="social-list" role="list" aria-label="Social links">
            <li>
              <a aria-label="facebook" href="#">
                <i className="social-icon fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a aria-label="youtube" href="#">
                <i className="social-icon fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a aria-label="twitter" href="#">
                <i className="social-icon fa-brands fa-square-twitter"></i>
              </a>
            </li>
            <li>
              <a aria-label="instragram" href="#">
                <i className="social-icon fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <nav className="footer-nav">
          <ul aria-label="Footer" role="list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Instruments</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Reviews</a>
            </li>

            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
