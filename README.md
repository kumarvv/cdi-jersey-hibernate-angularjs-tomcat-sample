cdi-resteasy-hibernate-angularjs-tomcat-sample
==============================================

Sample application with full CRUD for Airport codes to showcase following technologies: 
- Java 7 
- CDI 
- RestEasy (JAX-RS) 
- JPA / Hibernate
- AngularJS 
- Bootstrap 
- Maven (build) 

Setup
-----
- Use your favorite IDE to deploy and run the application. 
- Use maven command to deploy to Tomcat. NOTE: maven settings.xml need to be configured with your local server. 
```bash
$ mvn tomcat7:deploy
```

Access
------
- via browser using url: 
```
http://localhost:8080/sample 
```
![Alt text](/sample.png?raw=true "Sample page")

- via REST client using url: 
```html
GET http://localhost:8080/sample/api/airpots
GET http://localhost:8080/sample/api/airpots/123 (using id)
GET http://localhost:8080/sample/api/airpots/NYC (using code)
GET http://localhost:8080/sample/api/airpots/search/Wash (using text) 
POST http://localhost:8080/sample/api/airpots
PUT http://localhost:8080/sample/api/airpots
DELETE http://localhost:8080/sample/api/airpots/123 (using id)
```

