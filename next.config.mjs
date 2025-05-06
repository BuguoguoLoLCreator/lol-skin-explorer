import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const version = process.env.npm_package_version;

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'communitydragon.buguoguo.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  publicRuntimeConfig: { version },
  async redirects() {
    return [{ source: "/champions", destination: "/", permanent: false }];
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})(nextConfig);
