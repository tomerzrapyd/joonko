import supertest, {SuperTest, Test} from 'supertest';
import {API_PREFIX} from '../../testUtils';
import {USERS} from "../../../src/constants/users";
import {OPEN_JOBS, DEPARTMENTS} from "../../../src/constants/jobs";
import {app} from '../../../src/app';
import {RESPONSE_STATUS} from "../../../src/constants/status";

const request: SuperTest<Test> = supertest(app);

describe('/users', () => {
    const MAIN_ROUTE: string = '/users';

    context('/', () => {
        const ENDPOINT = '/';
        const NON_ADMIN_COOKIE_BODY = 'j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D';
        const ADMIN_COOKIE_BODY = 'j%3A%7B%22email%22%3A%22d%40joonko.co%22%7D';

        it('should return 401 when user is not authenticated', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .expect(401);
        });

        it('should return 403 when user is not an admin', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', [`_user_session=${NON_ADMIN_COOKIE_BODY}`])
                .expect(403);
        });

        it('should return not allowed status when user is not an admin', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', [`_user_session=${NON_ADMIN_COOKIE_BODY}`])
                .then(response => {
                    response.body.status.should.be.equal(RESPONSE_STATUS.NOT_ALLOWED);
                });
        });

        it('should return 200 when user is admin', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', [`_user_session=${ADMIN_COOKIE_BODY}`])
                .expect(200);
        });

        it('should return users when user is admin', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', [`_user_session=${ADMIN_COOKIE_BODY}`])
                .then(response => {
                    response.body.users.should.exist;
                    response.body.users.should.have.length(USERS.length);
                });
        })
    });

    context('/login', () => {
        const ENDPOINT: string = '/login';
        const INVALID_EMAIL: string = 'e@joonko.co';
        const INVALID_PWD: string = '111111';

        it('should return 404 when email not found', () => {
            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: INVALID_EMAIL, password: INVALID_PWD})
                .expect(404);
        });

        it('should return 401 when email found but password is invalid', () => {
            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: USERS[0].email, password: INVALID_PWD})
                .expect(401);
        });

        it('should return response status authentication failed on invalid credentials', () => {
            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: USERS[0].email, password: INVALID_PWD})
                .expect(401)
                .then(response => {
                    response.body.status.should.be.equal(RESPONSE_STATUS.INVALID_CREDENTIALS);
                });
        })

        it('should return 200 for first user', () => {
            const VALID_USER = USERS[0];

            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: VALID_USER.email, password: VALID_USER.password})
                .expect(200)
                .then(response => {
                    response.headers['set-cookie'].should.not.be.undefined();
                });
        });

        it('should return 200 for second user', () => {
            const VALID_USER = USERS[1];

            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: VALID_USER.email, password: VALID_USER.password})
                .expect(200)
                .then(response => {
                    response.headers['set-cookie'].should.not.be.undefined();
                });
        });

        it('should return 200 for third user', () => {
            const VALID_USER = USERS[2];

            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: VALID_USER.email, password: VALID_USER.password})
                .expect(200)
                .then(response => {
                    response.headers['set-cookie'].should.not.be.undefined();
                });
        });

        it('should return 200 for forth user', () => {
            const VALID_USER = USERS[3];

            return request
                .post(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .send({email: VALID_USER.email, password: VALID_USER.password})
                .expect(200)
                .then(response => {
                    response.headers['set-cookie'].should.not.be.undefined();
                });
        });
    });

    context('/jobs', () => {
        const ENDPOINT = '/jobs';

        it('should return 200 and RnD jobs for first user', () => {
            const RND_JOBS = OPEN_JOBS.filter(job => job.department === DEPARTMENTS.RND);

            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .expect(200)
                .then(response => {
                    const {jobs} = response.body;
                    jobs.length.should.be.equal(RND_JOBS.length);
                });
        });

        it('should return 200 and marketing jobs for second user', () => {
            const MARKETING_JOBS = OPEN_JOBS.filter(job => job.department === DEPARTMENTS.MARKETING);

            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22b%40joonko.co%22%7D'])
                .expect(200)
                .then(response => {
                    const {jobs} = response.body;
                    jobs.length.should.be.equal(MARKETING_JOBS.length);
                });
        });

        it('should return 200 and product jobs for third user', () => {
            const PRODUCT_JOBS = OPEN_JOBS.filter(job => job.department === DEPARTMENTS.PRODUCT);

            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .expect(200)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22c%40joonko.co%22%7D'])
                .then(response => {
                    const {jobs} = response.body;
                    jobs.length.should.be.equal(PRODUCT_JOBS.length);
                });
        });

        it('should return 200 and all jobs for forth user', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .expect(200)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22d%40joonko.co%22%7D'])
                .then(response => {
                    const {jobs} = response.body;
                    jobs.length.should.be.equal(OPEN_JOBS.length);
                });
        });

        it('should return 401 for unauthorized user', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT}`)
                .expect(401)
        });
    });

    context('/job/:id', () => {
        const ENDPOINT_PREFIX = '/job?id=';
        const VALID_JOB_ID = 1;
        const NON_EXIST_JOB_ID = 99;

        it('should return 401 when user is not authenticated', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${VALID_JOB_ID}`)
                .expect(401);
        });

        it('should return status authentication failed when user is not validated', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${VALID_JOB_ID}`)
                .then(response => response.body.status.should.be.equal(RESPONSE_STATUS.UNAUTHORIZED));
        })

        it('should return 400 when job id does not exist', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .expect(400);
        });

        it('should return status not found when job id does not exist', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .then(response => {
                    response.body.status.should.be.equal(RESPONSE_STATUS.NOT_FOUND);
                });
        });

        it('should return 404 when job id does not exist', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${NON_EXIST_JOB_ID}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .expect(404);
        });

        it('should return status not found when job id does not exist', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${NON_EXIST_JOB_ID}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .then(response => {
                    response.body.status.should.be.equal(RESPONSE_STATUS.NOT_FOUND);
                });
        });

        it('should return 200 when job id exists', () => {
            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${VALID_JOB_ID}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .expect(200);
        });

        it('should return correct job when job id exists', () => {
            const job = OPEN_JOBS[0];

            return request
                .get(`${API_PREFIX}${MAIN_ROUTE}${ENDPOINT_PREFIX}${job.id}`)
                .set('Cookie', ['_user_session=j%3A%7B%22email%22%3A%22a%40joonko.co%22%7D'])
                .then(response => {
                    const jobResponse = JSON.stringify(response.body.job);
                    jobResponse.should.be.equal(JSON.stringify(job));
                });
        });
    });
});