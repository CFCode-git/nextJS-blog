// import png from 'assets/images/1.png'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../Hooks/usePager';
import {withSession} from '../../lib/withSession';


type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage: number,
  currentUser: User | null
}

const PostsIndex: NextPage<Props> = (props) => {
  const {currentUser, posts, count, page, totalPage} = props;
  const {pager} = usePager({page, totalPage});
  return (
    <>
      <div className="posts">
        <header>
          <h1>{currentUser === null ? '未登录' : '当前用户: ' + JSON.stringify(currentUser)} | 文章列表 </h1>
          {currentUser ?
          <Link href="/posts/new"><a>新增文章</a></Link> :
          <Link href="/sign_in"><a>登录</a></Link>
          }
        </header>
        {posts.map(post => <div className="onePost" key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <a> {post.title} </a>
            </Link>
          </div>
        )}
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
        .posts{
          max-width: 800px;
          margin:0 auto;
          padding:16px;
        }
        .posts > header{
          display: flex;
          align-items: center;
        }
        .posts > header > h1{
          margin: 0 auto 0 0;
        }
        .onePost{
          border-bottom: 1px solid #ddd;
          padding:8px 0;
          cursor: pointer;
        }
        .onePost > a{
          border-bottom: none;
          color:#000;
        }
        .onePost:hover > a{
          color:#00adb5;
        } 
      `}</style>
    </>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const index = context.req.url.indexOf('?'); // ?的index
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search); // 得到query对象 {page:'1'}
    const page = parseInt(query.page?.toString()) || 1;
    // 获取当前的 user
    const currentUser = (context.req as any).session.get('currentUser') || null;
    const connection = await getDatabaseConnection();
    const perPage = 10;
    const [posts, count] = await connection.manager.findAndCount(Post, {skip: (page - 1) * perPage, take: perPage});

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        count: count,
        perPage,
        page,
        totalPage: Math.ceil(count / perPage),
        currentUser,
      }
    };
  }
);
