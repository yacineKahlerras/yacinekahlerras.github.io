const isGithubPages = process.env.NODE_ENV === "production";
const repo = "yacinekahlerras.github.io"; // your repo name

module.exports = {
  output: "export",
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  trailingSlash: true,
};
