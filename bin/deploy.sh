echo 'start';
docker start 2c5 &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch;
yarn compile &&
yarn m:run &&
git reset --hard HEAD &&
docker build -t chau/node-web-app . &&
docker kill app && docker rm app &&
docker run --name app --network=host -p 3000:3000 -d chau/node-web-app
echo 'OK!'
