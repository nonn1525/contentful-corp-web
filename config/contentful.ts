const contentful = require("contentful");

const config = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
};

export const createClient = () => {
  return contentful.createClient(config);
};
