# Sample API & GraphQL service

Envornment:

    - Apollo GraphQL extension for VS Code v1.19.9
    - Create an API server application:
      - Client authentication
        - Client secret
    - `.env` settings:
      - Okta domain = `OKTA_DOMAIN`
      - Client ID = `OKTA_CLIENTID`
      - Take one from CLIENT SECRETS to set in `OKTA_CLIENTSECRET`
  
API calls:

    Login first to get the JWT:
```
    POST http://localhost:9000/login
    JSON Body:
    {
      "username":"babakansari@hotmail.com", 
      "password": "bob"
    }
```

    The returned JWT can be used on subsequent API requests by adding the token to requests header:
```
    POST http://localhost:9000/graphql
    GraphQL Query:
        query Rostering {
            rostering {
                id
                name
            }
        }
```
    Authorization   bearer {Token from login}
