const { version } = require("./package.json");
const pwaCacheConfig = require("./pwa.cache");
const withPWA = require("next-pwa");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
const timestamp = Date.now();

module.exports = withPWA({
  pwa: {
    dest: "public",
    sw: `sw-${timestamp}.js`,
    fallbacks: { document: "/offline.html" },
    runtimeCaching: pwaCacheConfig,
    disable:true
    // disable: process.env.NODE_ENV === "development",
  },
  ...withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx"],
    reactStrictMode: true,
    images: {
      domains: ["communitydragon.buguoguo.cn"],
    },
    publicRuntimeConfig: { version },
    async redirects() {
      return [{ source: "/champions", destination: "/", permanent: false }];
    },
  }),
});
