import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  trustedOrigins: [
    process.env.APP_URL!,
    process.env.PROD_APP_URL!,
    'http://localhost:3000',
  ],

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'STUDENT',
      },
      phone: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        defaultValue: 'ACTIVE',
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      accessType: 'offline',
      prompt: 'select_account consent',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  advanced: {
    cookiePrefix: 'better-auth',
    useSecureCookies: process.env.NODE_ENV === 'production',
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true,
    trustProxy: true,
  },
});
