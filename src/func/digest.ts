import { Sha256 } from "@aws-crypto/sha256-js";

export async function sha256(data: string) {
  const hash = new Sha256();
  hash.update(data);
  return (await hash.digest()).toString();
}
