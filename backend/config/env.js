/**
 * Central environment schema for the backend.
 *
 * Rules of engagement:
 *   - Every process.env variable this app reads is declared here.
 *   - Values are coerced to real types (string, number, boolean) so the
 *     rest of the app never touches process.env directly.
 *   - Missing or malformed values fail loudly at startup, with a clear
 *     error message, not three layers deep in a library.
 *
 * Run `DEV_DB_LOGGING=banana npm run dev` to see the failure mode.
 */
require("dotenv").config();

const { cleanEnv, str, port, bool } = require("envalid");

module.exports = cleanEnv(process.env, {
  // ---------- Server ----------
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  PORT: port({ default: 3001 }),
  JWT_KEY: str({
    desc: "JWT signing key. Required in production; dev default provided.",
    devDefault: "local-dev-only-this-never-leaves-my-machine",
  }),

  // ---------- Development database ----------
  DEV_DB_USERNAME: str({ default: "conduit" }),
  DEV_DB_PASSWORD: str({ default: "conduit" }),
  DEV_DB_NAME: str({ default: "conduit" }),
  DEV_DB_HOSTNAME: str({ default: "127.0.0.1" }),
  DEV_DB_DIALECT: str({ choices: ["postgres"], default: "postgres" }),
  DEV_DB_LOGGING: bool({ default: false }),

  // ---------- Testing database ----------
  TEST_DB_USERNAME: str({ default: "conduit" }),
  TEST_DB_PASSWORD: str({ default: "conduit" }),
  TEST_DB_NAME: str({ default: "conduit_test" }),
  TEST_DB_HOSTNAME: str({ default: "127.0.0.1" }),
  TEST_DB_DIALECT: str({ choices: ["postgres"], default: "postgres" }),
  TEST_DB_LOGGING: bool({ default: false }),

  // ---------- Production database (placeholders, unused in dev) ----------
  PROD_DB_USERNAME: str({ default: "" }),
  PROD_DB_PASSWORD: str({ default: "" }),
  PROD_DB_NAME: str({ default: "" }),
  PROD_DB_HOSTNAME: str({ default: "" }),
  PROD_DB_DIALECT: str({ choices: ["postgres"], default: "postgres" }),
  PROD_DB_LOGGING: bool({ default: false }),
});
