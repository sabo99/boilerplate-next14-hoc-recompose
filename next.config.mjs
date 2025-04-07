// @ts-check
import fs from "fs";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	env: {
		CRYPTO_HASHED_KEY: fs.readFileSync(process.env.NEXT_PUBLIC_CRYPTO_HASHED_KEY_PATH || '', 'utf8'),
		CRYPTO_ENCRYPTED_KEY: fs.readFileSync(process.env.NEXT_PUBLIC_CRYPTO_ENCRYPTED_KEY_PATH || '', 'utf8'),
	},
};

export default nextConfig;
