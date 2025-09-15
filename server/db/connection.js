import Database from 'better-sqlite3';

const db = new Database('./db/freaky-fashion.db', { verbose: console.log });


export { db };
