import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(
  "https://eth-sepolia.g.alchemy.com/v2/pT-OnDUxFUjw3cKKie5i7_xCEiRALJxe"
); // For local development
const signer = wallet.connect(provider);

const db = new Database({ signer });

const prefix = "after_me_";
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();
await create.txn?.wait();
const tableName = create.txn?.names[0] ?? "";
console.log(tableName); // e.g., my_table_31337_2

const { meta: insert } = await db
  .prepare(`INSERT INTO ${tableName} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

insert.txn?.wait();

// verify data was uploaded
const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
