const isGithubPages = process.env.NODE_ENV === "production";
const repo = "yacinekahlerras.github.io";

module.exports = {
  output: "export",
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  trailingSlash: true,
};
