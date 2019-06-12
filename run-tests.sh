docker-compose -f docker-compose.test.yaml run --rm auth_test
docker container rm auth_db_test_1 -f -v