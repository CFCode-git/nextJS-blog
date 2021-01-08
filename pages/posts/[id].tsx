import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import Link from 'next/link';
import {withSession} from '../../lib/withSession';
import axios from 'axios';
import {useRouter} from 'next/router';
import {User} from '../../src/entity/User';

type Props = {
  post: Post,
  currentUser: User | null,
  id: number,
  posts: any
}

const postsShow: NextPage<Props> = (props) => {
  const {currentUser, post, id, posts} = props;
  console.log(post);
  console.log(posts);
  const router = useRouter();
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(() => {
      window.alert('删除成功');
      router.push('/posts');
    }, () => {
      window.alert('删除失败');
    });
  }, [id]);
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>当前用户: {JSON.stringify(currentUser.username)}</h1>
          <h1>标题: {post.title}</h1>
          <h4>作者: {JSON.stringify(posts.author.username)}</h4>
          {currentUser &&
          <p className="actions">
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
            <button onClick={onRemove}>删除</button>
          </p>
          }
        </header>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
        .wrapper{
          max-width: 800px;
          margin:16px auto;
          padding:0 16px;
        }
        h1{
          border-bottom: 1px solid #666;
          padding-bottom: 16px;
        }
        .actions > * {
          margin:4px;
        }
        .actions > *:first-child{
          margin-left:0;
        }
      `}</style>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(
  async (context:GetServerSidePropsContext) => {
    const id = context.params.id;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', id);

    // 将 posts 和他们对应的 author / user 信息拼起来 在筛选返回
    const posts = await connection
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user')
      .getMany()
      .then((res) => {
        return res.filter(item => item.id.toString() === id)[0];
      }, () => {});
    console.log(posts);


    const currentUser = (context.req as any).session.get('currentUser') || null;
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
        id: parseInt(id.toString()),
        posts: JSON.parse(JSON.stringify(posts))
      }
    };
  });
