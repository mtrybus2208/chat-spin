import { MealsAppConfig } from '@mtrybus/meals/utils-meals';

export const environment: MealsAppConfig = {
  auth: {
    authority:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_NFjQrSbST',
    redirectUrl: 'http://localhost:4200/auth/callback',
    clientId: '2st3ki9s34c26j2bvnfqcpr7r',
    scope: 'email openid phone',
    responseType: 'code',
  },
};
