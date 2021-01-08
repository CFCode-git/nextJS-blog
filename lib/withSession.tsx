// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {withIronSession} from 'next-iron-session';
import {GetServerSideProps, NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  console.log('===========================================');
  console.log(process.env.SECRET);
  console.log('===========================================');
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {secure: false}
  });
}
