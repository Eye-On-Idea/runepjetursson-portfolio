import common from "./common.json";
import nav from "./nav.json";
import errors from "./errors.json";
import footer from "./footer.json";
import index from "./pages/index.json";
import about from "./pages/about.json";
import contact from "./pages/contact.json";
import legal from "./pages/legal.json";
import cookies from "./pages/cookies.json";
import cases from "./pages/cases.json";
import caseStudiesContent from "./pages/caseStudiesContent.json";
import portfolio from "./portfolio.json";

export default {
  common,
  nav,
  errors,
  footer,
  landing: index,
  pages: {
    about,
    contact,
    legal,
    cookies,
    cases,
  },
  caseStudiesContent,
  portfolio,
};
