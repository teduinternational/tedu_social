import { cleanEnv, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGODB_URI: str(),
  });
};

export default validateEnv;
