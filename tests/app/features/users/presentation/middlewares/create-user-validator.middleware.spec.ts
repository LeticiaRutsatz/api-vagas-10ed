import { NextFunction, Request, Response } from 'express';
import { createUserValidator } from '../../../../../../src/app/features/users/presentation/middlewares';
import { Profile } from '../../../../../../src/app/shared/domain/enums';

describe('[Middleware] - Create User Validator', () => {
    let mockRequest: Request;
    let mockResponse: Response;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {} as Request;
        mockResponse = {} as Response;
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    });

    it('Move forward when data is correct', () => {
        mockRequest.body = { profile: Profile.ADMIN, name: 'any_name', email: 'any@email.com' };

        createUserValidator(mockRequest, mockResponse, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });

    it('Returns error when missing property name', () => {
        mockRequest.body = { profile: Profile.ADMIN, email: 'any@email.com' };

        createUserValidator(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('Returns error when missing property email', () => {
        mockRequest.body = { profile: Profile.ADMIN, name: 'any_name' };

        createUserValidator(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('Returns error when missing property profile', () => {
        mockRequest.body = { name: 'any_name', email: 'any@email.com' };

        createUserValidator(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('Returns error when missing property company', () => {
        mockRequest.body = { profile: Profile.RECRUITER, name: 'any_name', email: 'any@email.com' };

        createUserValidator(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
});
