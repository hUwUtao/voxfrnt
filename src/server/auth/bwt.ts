// def not going to use

import { Deserialization } from "serdebin";
import { en8, de8 } from "serdebin/helper";
import crypto from "node:crypto";

export default class Engine {
  private privateKey: Uint8Array;
  readonly hasher = crypto.createHash("sha256");

  constructor(pk: string) {
    this.privateKey = en8(pk);
  }

  private mac(v: Uint8Array | string) {
    if (typeof v == "string") v = en8(v);
    return this.hasher
      .update(Buffer.concat([v, this.privateKey]))
      .digest("base64")
      .replace(/=/g, "");
  }

  sign(d: Uint8Array) {
    const s = de8(d);
    return (
      Buffer.from(s).toString("base64").replace(/=/g, "") + "." + this.mac(s)
    );
  }

  verify(hash: string): Deserialization | null {
    const [v, sign] = hash.split("."),
      a = Buffer.from(v, "base64").toString("utf-8");
    return sign === this.mac(a) ? new Deserialization(en8(a)) : null;
  }
}
