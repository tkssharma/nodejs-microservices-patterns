cd service-login
DEBUG=http node server &

cd ..
cd service-orders
DEBUG=http node server &

cd ..
cd service-signup
DEBUG=http node server &

cd ..
cd service-log
DEBUG=http node server &

cd ..
cd api-gateway
DEBUG=http node server