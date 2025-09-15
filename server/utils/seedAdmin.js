import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import bcrypt from 'bcrypt';

import { db } from "../db/connection.js";

// Läs env-variabler
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.error('ADMIN_USERNAME eller ADMIN_PASSWORD saknas i .env');
  process.exit(1);
}

// Kolla om admin redan finns
const userExists = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

if (userExists) {
  console.log('Admin-användaren finns redan.');
  process.exit(0);
}

// Hasha lösenordet
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Lägg till admin
db.prepare('INSERT INTO users (username, email, password_hash, isAdmin) VALUES (?, ?, ?, ?)').run(username, username + "@admin.com", hashedPassword, 1,);

console.log(`Admin-användaren "${username}" skapades!`);
