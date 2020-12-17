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
