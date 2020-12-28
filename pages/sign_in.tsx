import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../Hooks/useForm';

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
      message: '登录成功'
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



