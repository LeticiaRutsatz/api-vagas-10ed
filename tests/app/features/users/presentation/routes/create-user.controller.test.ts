import supertest from 'supertest';
import app from '../../../../../../src/main/config/app';
import { JwtToken } from '../../../../../../src/app/shared/adapters/jwt';
import { Profile } from '../../../../../../src/app/shared/domain/enums';

const createToken = (profile = Profile.ADMIN): string => {
    const jwt = new JwtToken();

    const token = jwt.sign({
        id: 'any_id',
        profile,
    });

    return token;
};

describe('[POST] /users', () => {
    it('should return 401 http status when token is not provided', async () => {
        const response = await supertest(app).post('/users');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ success: false, error: 'invalid token' });
    });

    it('should return 401 http status when user is not admin', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken(Profile.CANDIDATE)}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ success: false, error: 'User not allowed' });
    });

    it('should return 400 when user profile is candidate', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send({
                profile: 'CANDIDATE',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, error: 'This profile cannot be created.' });
    });

    it('should return 400 when body data is invalid and user is admin', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toHaveLength(3);
        expect(response.body.error.map((e: any) => e.campo)).toEqual(['name', 'email', 'profile']);
    });

    it('should return 400 when body data is invalid and user is recruiter', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send({
                profile: 'RECRUITER',
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toHaveLength(3);
        expect(response.body.error.map((e: any) => e.campo)).toEqual(['name', 'email', 'company']);
    });

    it('should return 400 when body data is invalid and user is recruiter', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send({
                name: 'any_name',
                email: 'any_email@gmail.com',
                profile: 'RECRUITER',
                company: 'any company',
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();
    });
});
