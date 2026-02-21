import { prisma } from '../lib/prisma';
import { UserRole } from '../middleware/auth';

async function seedAdmin() {
  try {
    console.log('***** Admin Seeding Started....');
    const adminData = {
      name: 'Admin2 ',
      email: 'admin22@admin.com',
      role: UserRole.ADMIN,
      password: 'admin1234',
    };
    console.log('***** Checking Admin Exist or not');
    // check user exist on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists!!');
    }

    const signUpAdmin = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: `${process.env.BETTER_AUTH_URL}`,
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUpAdmin.ok) {
      console.log('**** Admin created');
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });

      console.log('**** Email verification status updated!');
    }
    console.log('******* SUCCESS ******');
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
