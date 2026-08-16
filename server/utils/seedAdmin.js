import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import bcrypt from 'bcrypt';

import supabase from "../config/supabase.js";

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.error('ADMIN_USERNAME eller ADMIN_PASSWORD saknas i .env');
  process.exit(1);
}

const { data: userExists, error: lookupError } = await supabase
  .from('users')
  .select('id')
  .eq('username', username)
  .maybeSingle();

if (lookupError) {
  console.error('Kunde inte kontrollera om admin finns:', lookupError.message);
  process.exit(1);
}

if (userExists) {
  console.log('Admin-användaren finns redan.');
  process.exit(0);
}

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

const { error: insertError } = await supabase.from('users').insert({
  username,
  email: username + "@admin.com",
  password_hash: hashedPassword,
  isAdmin: true,
});

if (insertError) {
  console.error('Kunde inte skapa admin-användaren:', insertError.message);
  process.exit(1);
}

console.log(`Admin-användaren "${username}" skapades!`);

