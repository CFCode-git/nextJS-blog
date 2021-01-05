import {NextPage} from 'next';
import React from 'react';
import Link from 'next/link';

const Home:NextPage = ()=>{
  return (
    <>
      <div className='cover'>
        <img src="/logo.png" alt=""/>
        <h1>呆尬猴的个人博客 - 测试网站</h1>
        <p>瞎写一下,以后加内容</p>
        <p><Link href="/posts"><a>文章列表</a></Link></p>
      </div>
      <style jsx>{`
        .cover{
          height:100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction:column;
        }
        img{
          height:120px;
          padding-bottom:40px;
        }
      `}</style>
    </>
  )
};
export default Home;

