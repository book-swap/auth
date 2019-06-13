<p align="center">
  <img src="https://user-images.githubusercontent.com/28015011/59379922-95bbcb00-8d60-11e9-85c9-ebbae607a599.png" alt="Bookswap Auth"/>
</p>

<p align="center">Authentication service for BookSwap.</p>

<p align="center">
<a href="https://travis-ci.org/book-swap/auth"><img src="https://travis-ci.org/book-swap/auth.svg?branch=master" alt="Build Status"></a>
<a href="https://david-dm.org/book-swap/auth"><img src="https://img.shields.io/david/book-swap/auth.svg" alt="Dependencies Status"></a>
<a href='https://coveralls.io/github/book-swap/auth?branch=master'><img src='https://img.shields.io/coveralls/github/book-swap/auth.svg' alt='Coverage Status' /></a>
<a href="https://snyk.io/test/github/book-swap/auth?targetFile=package.json"><img src="https://img.shields.io/snyk/vulnerabilities/github/book-swap/auth.svg" alt="Known Vulnerabilities"></a>
</p>

## Installation
Clone the repository, build the docker container and run it:
```
$ git clone https://github.com/book-swap/auth.git
$ docker-compose up
```

**Don't use `docker-compose` for deploying to production!**
## API
This service provides an easy API for authentication. It was built to be used within the BookSwap miccroservices architecture. To use this service, make HTTP requests to the following routes, sending data as JSON.

Routes available:

### `POST /local/register`
  * **email**
  * **password**

### `POST /local/login`
  * **email**
  * **password**
  
#### Response: 
  * **jwt** - save this token on client; send it with every request as `Bearer` authorization header

## Testing
The repository comes with a docker-compose config for easy testing. Simply run `./run-tests`.

## License
BookSwap is licensed under the [MIT license](https://github.com/book-swap/auth/blob/master/LICENSE).
