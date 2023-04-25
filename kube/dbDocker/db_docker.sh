#!/bin/bash

set -e
set -u

function create_user_and_database() {
 local database=$1
 echo " Creating database '$database'"
 psql -v ON_ERROR_STOP=1 --username "root" postgres <<-EOSQL
     CREATE DATABASE ${database} OWNER root;
     USE ${database};
     CREATE TABLE forecast_preference (user_id INT PRIMARY KEY, location_keys varchar(1000));
     create table users ( id int auto_increment, email varchar(200), name varchar(200), password varchar(200), primary(id));
EOSQL
}

echo "database creation request check: $POSTGRES_MULTIPLE_DATABASES"
create_user_and_database weather_service
echo "databases created"
fi