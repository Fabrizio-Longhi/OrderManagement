#!/bin/bash
# Script para inicializar las bases de datos (OrderManagement/init-db.sh)

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE order_management_test;
EOSQL

echo "Base de datos de testing creada exitosamente"