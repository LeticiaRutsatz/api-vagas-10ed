import Redis from 'ioredis';

export class CacheRepository {
    private redis: Redis;

    constructor() {
        this.redis = new Redis(
            'redis://default:8xWae2tpeTgQaejQodvJkPeZnJ46FNa2@redis-17623.c52.us-east-1-4.ec2.cloud.redislabs.com:17623',
        );
    }

    // salvar o dado de forma persiste
    public async save(key: string, value: any): Promise<boolean> {
        const result = await this.redis.set(key, JSON.stringify(value));
        return result === 'OK';
    }

    public async saveEx(key: string, value: any, time: number): Promise<boolean> {
        const result = await this.redis.setex(key, time, JSON.stringify(value));
        return result === 'OK';
    }

    public async get(key: string): Promise<any | undefined> {
        const result = await this.redis.get(key);
        if (!result) return undefined;
        return JSON.parse(result);
    }

    public async exists(key: string): Promise<boolean> {
        const result = await this.redis.exists(key);
        return result === 1;
    }

    public async remove(key: string): Promise<boolean> {
        const result = await this.redis.del(key);
        return result === 1;
    }
}
