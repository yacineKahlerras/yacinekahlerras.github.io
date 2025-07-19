const isGithubPages = process.env.NODE_ENV === "production";
const repo = "yacinekahlerras.github.io";

module.exports = {
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  basePath: isGithubPages ? `/${repo}` : "",
  trailingSlash: true,
};
