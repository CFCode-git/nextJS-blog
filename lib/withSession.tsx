// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {withIronSession} from 'next-iron-session';
import {NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD, 对 cookie 加密的密钥
    password: '7df28029-b28d-4e59-bdac-fe8e84cabb3c', // 方便测试, 先这样写
    cookieName: 'blog',
  });
}
