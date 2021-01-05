// import png from 'assets/images/1.png'
import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../Hooks/usePager';


type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage: number
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts, count, page, totalPage} = props;
  const {pager} = usePager({page, totalPage});
  return (
    <>
      <div className="posts">
        <h1>文章列表</h1>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf('?'); // ?的index
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search); // 得到query对象 {page:'1'}
  const page = parseInt(query.page?.toString()) || 1;
  const connection = await getDatabaseConnection();
  const perPage = 10;
  const [posts, count] = await connection.manager.findAndCount(Post, {skip: (page - 1) * perPage, take: perPage});

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count: count,
      perPage,
      page,
      totalPage: Math.ceil(count / perPage)
    }
  };
};
