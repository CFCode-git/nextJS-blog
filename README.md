# 初始代码

## 启动数据库
```markdown
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

或者旧版 windows docker 客户端运行以下代码
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 清空之前的开发环境
```docker
docker kill <id>
docker rm <id> 

rm -rf blog-data

或者旧版 windows docker 客户端运行以下代码
docker container prune
docker image prune
docker volumn rm blog-data
```

## 创建数据库
```docker
docker exec -it <id> bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表

首先修改 ormconfig.json 中的 host,然后运行(旧版windows docker)

```markdown
yarn m:run
node dist/seed.js
```

### yarn m:run 出错解决方法

由于 entity/user.ts 中验证 username 唯一性用到了 getDatabaseConnection, 在当数据库还没有创建的时候会报错,因此可以先删除相关代码
创建数据库执行 m:run 后再复原


## 开发

```bash
yarn dev
# or 
npm run dev
```

## 部署

```bash
ssh blog@dev1 'sh /home/blog/app/bin/deploy.sh'
```

```bash
yarn install --production=false
yarn build
docker build -t chau/node-web-app .
docker run --network=host -p 3000:3000 -d chau/node-web-app
```

## 一键部署

```bash
git push
ssh blog@dev1 'bash -s' < bin/deploy.sh
```
