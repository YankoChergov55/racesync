import dotenv from 'dotenv';

dotenv.config({
	quiet: true,
});

interface Config {
	port: number;
	nodeEnv: string;
	jwtSecret: string;
	jwtCookie: string;
}

const appConfig: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: String(process.env.NODE_ENV),
	jwtSecret: String(process.env.JWT_SECRET),
	jwtCookie: String(process.env.JWT_COOKIE),
};

export default appConfig;
