const Footer = () => {
  return (
    <footer className="primary-footer" id="footer">
      <div className="primary-footer-wrapper">
        <div className="primary-footer-logo-social">
          <ul className="social-list" role="list" aria-label="Social links">
            <li>
              <a aria-label="facebook" href="#">
                <i className="social-icon fa fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a aria-label="youtube" href="#">
                <i className="social-icon fa fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a aria-label="twitter" href="#">
                <i className="social-icon fa fa-brands fa-square-twitter"></i>
              </a>
            </li>
            <li>
              <a aria-label="instragram" href="#">
                <i className="social-icon fa fa-brands fa-instagram"></i>
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
              <a href="#instruments-section">Instruments</a>
            </li>
            <li>
              <a href="#about-section">About Us</a>
            </li>
            <li>
              <a href="#slider-section">Reviews</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <p>Contact us</p>
              <p>+3821778897</p>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
