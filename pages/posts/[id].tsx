import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {NextPage} from 'next';

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={ {__html:post.htmlContent} }>
      </article>
    </div>
  );
};

export default postsShow;

// 获取 id，穷举，知道id才能生成页面
export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map(id => ({params: {id: id}})),
    // id 列表
    // paths: [
    //   {
    //     params: {id: '第一篇博客'}
    //   },
    //   {
    //     params: {id: '第二篇博客'}
    //   }
    // ],
    fallback: false
  };
};

// SSG
export const getStaticProps = async (staticContext: any) => {
  const id = staticContext.params.id;
  const post = await getPost(id);
  return {
    props: {
      post: post
    }
  };
};
