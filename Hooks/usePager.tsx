import React from 'react';
import Link from 'next/link';
import _ from 'lodash';

type Options = {
  page: number,
  totalPage: number,
  urlMaker?: (n: number) => string
}

const defaultUrlMaker = (n: number) => {
  return `?page=${n}`;
};

export const usePager = (options: Options) => {
  const {page, totalPage, urlMaker: _urlMaker} = options;
  const urlMaker = _urlMaker || defaultUrlMaker;
  const numbers = [];
  numbers.push(1);
  numbers.push(totalPage);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage).reduce((result, n) =>
      n - (result[result.length - 1] || 0) === 1 ?
        result.concat(n) :
        result.concat(-1, n)
    , []);


  const pager = totalPage > 1 ?
    (
      <div className="wrapper">
        {page !== 1 && <Link href={urlMaker(page - 1)}>
          <a>上一页</a>
        </Link>}

        {pageNumbers.map(n => n === -1 ?
          <span key={n}>...</span> :
          <Link key={n} href={urlMaker(n)}><a>{n}</a></Link>)}

        {page < totalPage && <Link href={urlMaker(page + 1)}>
          <a>下一页</a>
        </Link>}
        <span>
      第 {page} / {totalPage} 页
      </span>

        <style jsx>{`
        .wrapper{
          margin: 0 -8px;
          padding:8px 0;
        }
        .wrapper > a, .wrapper > span{
          margin: 0 8px;
        }
      `}</style>
      </div>
    ) :
    null;

  return {
    pager
  };
};
