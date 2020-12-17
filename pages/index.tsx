// import png from 'assets/images/1.png'
import {GetServerSideProps, NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {UAParser} from 'ua-parser-js';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';

console.log('执行了 index.tsx');

type Props = {
  posts: Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  console.log('posts');
  console.log(posts);
  return (
    <div>
      {posts.map(post=><div key={post.id}>{post.title}</div>)}
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
