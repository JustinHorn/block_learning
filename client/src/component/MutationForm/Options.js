import { makeScreenShotAction } from "./Actions";

const sharedOptions = {
  description: {
    name: "Description",
    placeholder: "I love this project",
    value: "",
  },
  imgUrl: {
    name: "Url of image",
    placeholder:
      "https://justinhorntestbucket.s3.amazonaws.com/cookieclicker-justin.herokuapp.com/.png",
    value: "",
  },
  github: {
    name: "Github",
    placeholder: "https://github.com...",
    value: "",
  },
  tags: {
    name: "Tags",
    placeholder: "node.js",
    value: ["react.js"],
    handler: "tag",
  },
};

const title = {
  name: "Title",
  value: "",
  placeholder: "Cookie Clicker",
  trim: true,
};

const createOptions = {
  title,
  href: {
    name: "Link to deployed project",
    value: "",
    placeholder: "https://cookieclicker-justin.herokuapp.com/",
    trim: true,
    handler: "action",
    ...makeScreenShotAction,
  },
  ...sharedOptions,
};

const updateOptions = {
  title,
  href: {
    name: "Get an imgUrl",
    value: "",
    handler: "actionNoInput",
    ...makeScreenShotAction,
  },
  ...sharedOptions,
};

const loginOptions = {
  email: {
    name: "Email",
    value: "",
    placeholder: "Email",
    trim: true,
  },
  password: {
    name: "Password",
    value: "",
    placeholder: "Password",
    trim: true,
    pw: true,
  },
};

const registerOptions = {
  ...loginOptions,
  name: {
    name: "Name",
    value: "",
    placeholder: "Name",
    trim: true,
  },
};

export { registerOptions, loginOptions, createOptions, updateOptions };
