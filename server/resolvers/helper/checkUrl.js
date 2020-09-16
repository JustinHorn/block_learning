var Url = require("url-parse");

class Check {
  constructor(href) {
    const url = new Url(href);
    this.host = url.host;
    this.path = url.pathname;
  }
  noLocalHost = () => {
    if (!this.host || this.host.includes("localhost")) {
      throw Error("No localhost urls");
    }
    return { ...this };
  };

  mustBeGithub = () => {
    if (this.host && this.host.includes("github.com")) {
      return { ...this };
    } else {
      throw Error("Github must be a valid github url");
    }
  };
}

module.exports = { Check };
