// Generate admin password hash for seed data
const bcrypt = require('bcryptjs');

const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('Admin Password Hash:');
console.log(hash);
console.log('\nUse this hash in database/seed.sql');
