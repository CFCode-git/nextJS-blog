// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {withIronSession} from 'next-iron-session';
import {NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {secure: false}
  });
}
