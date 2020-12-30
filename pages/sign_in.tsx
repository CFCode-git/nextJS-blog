import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../Hooks/useForm';
import qs from 'querystring';

const SignIn: NextPage<{ user: User }> = (props) => {

  const {form} = useForm({
    initFormData: {username: '', password: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    buttons: <button type="submit">登录</button>,
    submit: {
      request(formData) {
        return axios.post(`/api/v1/sessions`, formData);
      },
      success: () => {
        window.alert('登录成功');
        const query = qs.parse(window.location.search.substr(1)); /* 是一个对象 {return_to:'posts/new'}*/
        window.location.href = query.return_to.toString();
      }
    }
  });


  return (form);
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');

    return {
      props: {
        user: JSON.parse(JSON.stringify(user || ''))
      }
    };
  });



