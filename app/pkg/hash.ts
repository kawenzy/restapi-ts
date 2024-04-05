import crypto from 'crypto'

export function hassPassword(password: string) {
    const salt = crypto.randomBytes(15).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return { hash, salt }
}


export function verifyPassword(
{
    VerifyPassword,
    hash,
    salt 
}: {
    VerifyPassword: string;
    hash: string;
    salt: string;
}) {
const vyhash = crypto.pbkdf2Sync(VerifyPassword, salt, 1000, 64, "sha512").toString('hex');

return vyhash === hash
}