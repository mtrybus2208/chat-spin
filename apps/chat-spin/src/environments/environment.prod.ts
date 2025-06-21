import { EnvironmentConfig } from '@mtrybus/util-config';

// TODO: Change to prod
export const environment: EnvironmentConfig = {
  chatSpinApiUrl: 'https://tusr36nrx0.execute-api.us-east-2.amazonaws.com/dev',
  chatSpinFilesApiUrl:
    'https://tusr36nrx0.execute-api.us-east-2.amazonaws.com/dev',
  testMe: 'Hello from PROD',
  wsEndpoint: 'wss://n6cp5yn4nl.execute-api.us-east-2.amazonaws.com/dev/',
};
