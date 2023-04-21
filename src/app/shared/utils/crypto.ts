import bcrypt from 'bcrypt';

export class CryptoPassword {
    private salt = process.env.BCRYPT_SALT;

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
