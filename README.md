# software-security-web-app

Frontend Application for assignment 2 - Software Security

This is a React application regarding products for a music store. This music store only sells vinyl and apparel (merch). The service is publically available at https://www.brechtheldens.xyz

## Prevention of common web vulnerabilities

### XSS and XSSI

User input is never added in any JavaScript URL's or in the DOM using dangerouslySetInnerHTML.

### Clickjacking

The header 'X-FRAME-OPTIONS' is automatically set with every incoming request. A custom Cloudflare worker (script) appends this header.

### CSRF Mitigation

Auth0 is used as identity provider. Upon login, the accesstoken is kept in memory at all times without setting a cookie.
