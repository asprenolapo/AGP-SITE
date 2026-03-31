module.exports = {
  site_name: "Anarchia del loggione",

  // These title and description are used as default values for all pages if you don't add specific ones for a page
  title: "Site title", // Reccomended to be 50-60 characters long for SEO purposes
  description: "Site description", // Reccomended to be 150-160 characters long for SEO purposes

  keywords: "anarchia, loggione, scapocchia", // Keywords are deprecaed, but some search engines still use them, so you can add them if you want

  domain: "webfixer.it",
  url: "https://webfixer.it", // It WILL NOT end with a slash /
  lang: "it",
  author: "Michele, Aspreno, Andrea",
  favicon: "/assets/favicon.svg",
  logo: "/assets/logo.svg",
  image_width: [320, 480, 720, 1280, 1920, 2048, 2560, 3840, 4096, 7680],

  copyright: {
    year: "2026",
    text: "Tutti i diritti riservati",
  },

  legal: {
    privacy: "", //link to privacy policy
    cookie: "", //link to cookies policy
    cookieControls: "", //link to cookies management
    terms: "", //Link to terms and conditions
  },

  pages: {
    homepage: {
      seo: {
        title: "Homepage",
        description: "Description",
      },
    },
    contactus: {
      seo: {
        title: "Contact us",
        description: "description",
      },
    },
    futurevisions: {
      seo: {
        title: "Future visions",
        description: "description",
      },
    },
    researchanddevelopment: {
      seo: {
        title: "Research and development",
        description: "description",
      },
    },
    aboutus: {
      seo: {
        title: "About us",
        description: "description",
      },
    },
    consultancy: {
      seo: {
        title: "Consultancy",
        description: "description",
      },
    },
    404: {
      seo: {
        title: "404 - Not found",
      },
    },
  },
};
