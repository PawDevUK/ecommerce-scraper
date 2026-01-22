import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('your-secret-key', 'salt', 32); // In production, use a proper key management
const iv = crypto.randomBytes(16);

export function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
}

export function decrypt(encrypted, ivHex) {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}