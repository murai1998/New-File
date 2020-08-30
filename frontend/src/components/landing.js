import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  hamburgerDrop = () => {
    var x = document.getElementById("navbarResponsive");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };
  render() {
    return (
      <div>
        <body id="page-top">
          <nav
            class="navbar navbar-expand-lg navbar-light fixed-top"
            id="mainNav"
          >
            <div class="container">
              <a class="navbar-brand js-scroll-trigger" href="#page-top">
                Cardinal
              </a>
              <button
                class="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.hamburgerDrop}
              >
                <span class="navbar-toggler-icon"></span>
                <i class="fas fa-bars"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#about">
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#projects">
                      Details
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#signup">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <header class="masthead">
            <div class="container d-flex h-100 align-items-center">
              <div class="mx-auto text-center">
                <h1 class="mx-auto my-0 text-uppercase">Cardinal</h1>
                <h2 class="text-white-50 mx-auto mt-2 mb-5">
                  Your road to better health starts here. Cardinal can help you
                  meet your well-being goals
                </h2>
                <div>
                  <a href="#about">
                    <Link
                      className="btn btn-primary js-scroll-trigger"
                      id="logButtons"
                      to="/sign-up"
                    >
                      Sign Up
                    </Link>
                  </a>
                  <a href="#about">
                    <Link
                      className="btn btn-light js-scroll-trigger"
                      id="logButtons"
                      to="/log-in"
                    >
                      Log In
                    </Link>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <section class="about-section text-center" id="about">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <h2 class="text-white mb-4">About</h2>
                  <p class="text-white-50">
                    Train, eat and live better with just one click. Simple to
                    use and easy to stay on track. Cardinal is created to build
                    a helthier and more productive routine for every day.
                    Whether you're hoping to start a new fitness activity,
                    reduce stress or improve your eating habits, we are here for
                    you!
                  </p>
                </div>
              </div>
              <img
                class="img-fluid"
                src={require("../images/weight.jpg")}
                alt=""
              />
            </div>
          </section>
          <section class="projects-section bg-light" id="projects">
            <div class="container">
              <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                <div class="col-xl-8 col-lg-7">
                  <img
                    class="img-fluid mb-3 mb-lg-0"
                    src={require("../images/footer.jpg")}
                    alt=""
                  />
                </div>
                <div class="col-xl-4 col-lg-5">
                  <div class="featured-text text-center text-lg-left">
                    <h4>Details</h4>
                    <p class="text-black-50 mb-0">
                      And getting started is easier than ever before. With a
                      variety of programs, tools and resources to improve your
                      health and reduce long-term health risks, you'll be on
                      your way to a better you. Need a little extra nudge? You
                      could even get rewarded for your efforts.
                    </p>
                  </div>
                </div>
              </div>

              <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
                <div class="col-lg-6">
                  <img
                    class="img-fluid"
                    src={require("../images/sec1.jpg")}
                    alt=""
                  />
                </div>
                <div class="col-lg-6">
                  <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                      <div class="project-text w-100 my-auto text-center text-lg-left">
                        <h4 class="text-white">How to start?</h4>
                        <p class="mb-0 text-white-50">
                          Simply create an account, add your parameters, choose
                          an activity level. And you are good to go!
                        </p>
                        <hr class="d-none d-lg-block mb-0 ml-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row justify-content-center no-gutters">
                <div class="col-lg-6">
                  <img
                    class="img-fluid"
                    src={require("../images/sec2.jpg")}
                    alt=""
                  />
                </div>
                <div class="col-lg-6 order-lg-first">
                  <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                      <div class="project-text w-100 my-auto text-center text-lg-right">
                        <h4 class="text-white">Still esitating</h4>
                        <p class="mb-0 text-white-50">
                          We could help so many people to achieve their dream
                          bodies, we will definitely help you as well
                        </p>
                        <hr class="d-none d-lg-block mb-0 mr-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="signup-section" id="signup">
            <div class="container">
              <div class="row">
                <div class="col-md-10 col-lg-8 mx-auto text-center">
                  <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                  <h2 id="quest" class="text-white mb-5">
                    Do you have any questions? Contact us
                  </h2>
                  {/* <p class="text-white-50">
                    More than anything, we want you to be thrilled with your
                    Cardinal experience. If you have any questions or need help
                    with selecting the best activity for you, we’re always here
                    to help!
                  </p> */}
                </div>
              </div>
            </div>
          </section>

          <section class="contact-section bg-black">
            <div class="container">
              <div class="row">
                <div class="col-md-4 mb-3 mb-md-0">
                  <div class="card py-4 h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-envelope text-primary mb-2"></i>
                      <h4 class="text-uppercase m-0">Email</h4>
                      <hr class="my-4" />

                      <div class="small text-black-50">annmuray@gmail.com</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0">
                  <div class="card py-4 h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-mobile-alt text-primary mb-2"></i>
                      <h4 class="text-uppercase m-0">Phone</h4>
                      <hr class="my-4" />
                      <div class="small text-black-50">+1 (608) 504-6409</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0">
                  <div class="card py-4 h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-mobile-alt text-primary mb-2"></i>
                      <h4 class="text-uppercase m-0">Address</h4>
                      <hr class="my-4" />
                      <div class="small text-black-50">Dallas, TX</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="social d-flex justify-content-center">
                <a class="mx-2" href="https://github.com/murai1998">
                  {/* <i>Git</i> */}
                  <img
                    id="resource"
                    class="fab fa-github"
                    src={require("../images/Octocat.png")}
                    alt="github"
                  />
                </a>
                <a class="mx-2" href="https://www.linkedin.com/in/hmurai/">
                  <img
                    id="resource"
                    class="fab fa-github"
                    src={require("../images/clipart953748.png")}
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>
          </section>

          <footer class="footer bg-black small text-center text-white-50">
            <div class="container">Cardinal 2020</div>
          </footer>
        </body>
      </div>
    );
  }
}

export default Landing;
