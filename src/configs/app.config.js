const appConfig = {
    apiPrefix: 'http://82.165.212.140:5000',
    // apiPrefix: 'http://localhost:5500',

    authenticatedUserRoles: ['ADMINISTRATOR', 'EMPLOYEE', 'CLIENT'],
    authenticatedEntryPath: '/app/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
