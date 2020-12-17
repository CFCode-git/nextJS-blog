// import png from 'assets/images/1.png'
import {GetServerSideProps, NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {UAParser} from 'ua-parser-js';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';

console.log('执行了 index.tsx');

type Props = {
  browser: {
    name: string,
    version: string,
    major: string
  }
}
const index: NextPage<Props> = (props) => {
  const {browser} = props;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const w = document.documentElement.clientWidth;
    setWidth(w);
  }, []);

  return (
    <div>
      <h1>你的浏览器是: {browser.name}</h1>
      <h2>你的浏览器窗口大小是 {width} 像素</h2>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  console.log('connect.');
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser
    }
  };
};
