import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import marked from 'marked'
import Link from 'next/link';
import {withSession} from '../../lib/withSession';
import axios from 'axios';
import {useRouter} from 'next/router';

type Props = {
  post: Post,
  currentUser: User | null,
  id: number
}

const postsShow: NextPage<Props> = (props) => {
  const {currentUser, post, id} = props;
  const router = useRouter();
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(()=>{
      window.alert('删除成功');
      router.push('/posts')
    },()=>{
      window.alert('删除失败');
    })
  }, [id]);
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
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
    const currentUser = (context.req as any).session.get('currentUser') || null;
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
        id: parseInt(id.toString())
      }
    };
  });
