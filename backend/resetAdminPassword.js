require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./models');

const resetAdminPassword = async () => {
  try {
    console.log('Finding admin user...');
    
    const admin = await db.User.findOne({
      where: { email: 'admin@fyies.com' }
    });

    if (!admin) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }

    console.log('✅ Admin found:', {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

    // Test current password
    const testPassword = 'Admin@123';
    const isMatch = await bcrypt.compare(testPassword, admin.password);
    console.log('Current password matches:', isMatch ? '✅ YES' : '❌ NO');

    if (!isMatch) {
      // Reset password
      console.log('Resetting password...');
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      admin.password = hashedPassword;
      await admin.save();
      console.log('✅ Password reset to: Admin@123');
    }

    // Test login simulation
    console.log('\n--- Testing login simulation ---');
    const loginTest = await bcrypt.compare('Admin@123', admin.password);
    console.log('Login test:', loginTest ? '✅ PASS' : '❌ FAIL');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

resetAdminPassword();