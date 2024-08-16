const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_URL_API_RAILS: "http://localhost:3000",
  },
};

export default nextConfig;
