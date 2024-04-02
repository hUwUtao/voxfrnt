import {
  mysqlTable,
  unique,
  char,
  double,
  float,
  smallint,
  bigint,
  mediumint,
  primaryKey,
  datetime,
} from "drizzle-orm/mysql-core";

export const authme = mysqlTable("authme", {
  id: mediumint("id", { unsigned: true })
    .primaryKey()
    .autoincrement()
    .notNull(),
  username: char("username", { length: 16 }).unique().notNull(),
  realname: char("realname", { length: 16 }).notNull(),
  password: char("password", { length: 255 }).notNull(),
  ip: char("ip", { length: 40 }).default("NULL"),
  lastlogin: bigint("lastlogin", { mode: "number", unsigned: true }),
  x: double("x").notNull(),
  y: double("y").notNull(),
  z: double("z").notNull(),
  worldVoid: char("world_void", { length: 255 }).default("world").notNull(),
  regdate: bigint("regdate", { mode: "number" }).notNull(),
  regip: char("regip", { length: 39 }).default("NULL"),
  yaw: float("yaw"),
  pitch: float("pitch"),
  email: char("email", { length: 255 }).default("NULL"),
  isLogged: smallint("isLogged").notNull(),
  hasSession: smallint("hasSession").notNull(),
  totp: char("totp", { length: 32 }).default("NULL"),
});

export const sessionTable = mysqlTable("websession", {
  id: char("id", {
    length: 255,
  }).primaryKey(),
  userId: mediumint("uid", { unsigned: true })
    .notNull()
    .references(() => authme.id),
  expiresAt: datetime("expires_at").notNull(),
});
