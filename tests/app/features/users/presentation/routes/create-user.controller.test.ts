import supertest from 'supertest';
import app from '../../../../../../src/main/config/app';
import { JwtToken } from '../../../../../../src/app/shared/adapters/jwt';
import { Profile } from '../../../../../../src/app/shared/domain/enums';
import { CreateUserUseCase } from '../../../../../../src/app/features/users/domain/usecases';
import { appDataSource } from '../../../../../../src/app/shared/infra/db/data-source';
import { UserEntity } from '../../../../../../src/app/shared/infra/db/entities';
import { LoginUseCase } from '../../../../../../src/app/features/authentication/domain/usecases';

const createToken = (profile = Profile.ADMIN): string => {
    const jwt = new JwtToken();

    const token = jwt.sign({
        id: 'any_id',
        profile,
    });

    return token;
};

const createUserEntity = async (): Promise<UserEntity> => {
    const user = appDataSource.manager.create(UserEntity, {
        name: 'any_name',
        email: 'any_email@gmail.com',
        profile: Profile.RECRUITER,
        company: 'any company',
        password: 'any_password',
    });

    await appDataSource.manager.save(user);
    return user;
};

const createUserBody = () => ({
    name: 'any_name',
    email: 'any_email@gmail.com',
    profile: 'RECRUITER',
    company: 'any company',
});

describe('[POST] /users', () => {
    beforeAll(() => {
        return appDataSource.initialize();
    });

    afterAll(() => {
        return appDataSource.destroy();
    });

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
                profile: 'recruiter',
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toHaveLength(3);
        expect(response.body.error.map((e: any) => e.campo)).toEqual(['name', 'email', 'company']);
    });

    it('should return 400 if user already exists', async () => {
        await createUserEntity();

        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send(createUserBody());

        expect(response.status).toBe(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe('Email already exists');

        await appDataSource.manager.delete(UserEntity, {});
    });

    it('should return 500 if an unmapped error occurs ', async () => {
        jest.spyOn(CreateUserUseCase.prototype, 'execute').mockRejectedValueOnce(
            new Error('any_error'),
        );

        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send(createUserBody());

        expect(response.status).toBe(500);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBeTruthy();
    });

    it('should return 200 with user created - profile recruiter', async () => {
        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send(createUserBody());

        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();

        const userEntity = await appDataSource.manager.findOne(UserEntity, {
            where: { email: 'any_email@gmail.com' },
        });

        expect(userEntity).toBeTruthy();

        expect(response.body.data.id).toBe(userEntity!.id);
        expect(response.body.data.name).toBe(userEntity!.name);
        expect(response.body.data.company).toBe(userEntity!.company);
        expect(response.body.data.profile).toBe(userEntity!.profile);

        const loginUsecase = new LoginUseCase();
        const resultLogin = await loginUsecase.execute({
            email: 'any_email@gmail.com',
            password: process.env.ADMIN_PASSWORD as string,
        });

        expect(resultLogin).toBeTruthy();

        await appDataSource.manager.delete(UserEntity, {});
    });

    it('should return 200 with user created - admin recruiter', async () => {
        await createUserEntity();

        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${createToken()}`)
            .send({
                name: 'any_name',
                email: 'any_email_admin@gmail.com',
                profile: 'ADMIN',
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();

        const userEntity = await appDataSource.manager.findOne(UserEntity, {
            where: { email: 'any_email_admin@gmail.com' },
        });

        expect(userEntity).toBeTruthy();

        expect(response.body.data.id).toBe(userEntity!.id);
        expect(response.body.data.company).toBeFalsy();

        await appDataSource.manager.delete(UserEntity, {});
    });
});
