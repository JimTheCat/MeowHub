# MeowHub
Engineering Thesis

## Database
For production environment, you need to have an oracle database.
If you don't have a created an oracle database yet, run script `database/install.sql`.


## Profiles
`swagger` - to run application with Swagger  
`dev`     - to run application with H2 database (for offline development)

## Swagger
To run swagger use `swagger` profile.  
Link to swagger documentation: http://localhost:8080/swagger-ui/index.html

## Offline development && Testing
To develop application offline please use `dev` profile - it uses h2 database instead of oracle database that is used on production.  
<img alt="img.png" height="300" src="img.png" width="500"/>  
No other configurations are needed.

## Environment variables
`DB_URL` - database url    
`DB_USERNAME` - database username  
`DB_PASSWORD` - database password  
`JWT_SECRET` - secret key for JWT token    
`JWT_EXPIRATION_MS` - expiration time for JWT token in milliseconds  

With production environment, you need to set all of these variables.