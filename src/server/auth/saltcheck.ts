import { sha256 } from "../../func/digest";

export async function saltcheck(phPwd: string, hashd: string): Promise<boolean> {
  // $SHA$salt$hash, where hash := sha256(sha256(password) . salt)
  // somehow this thing might work
  const [_, __, salt, salten] = hashd.split("$");
  return await sha256(phPwd + salt) === salten;
}
