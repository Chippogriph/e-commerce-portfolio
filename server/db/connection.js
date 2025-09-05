import Database from 'better-sqlite3';

const db = new Database('./db/products.db', { verbose: console.log });


export { db };
