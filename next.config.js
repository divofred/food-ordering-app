/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	nextConfig,
	env: {
		STRAPI_URL: process.env.STRAPI_URL,
	},
};
