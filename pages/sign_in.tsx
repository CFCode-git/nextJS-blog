import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../Hooks/useForm';

const SignIn: NextPage<{ user: User }> = (props) => {
  const initFormData = {username: '', password: ''};

  const onSubmit = (formData: typeof initFormData) => {
    axios.post(`/api/v1/sessions`, formData)
      .then(() => {
        window.alert(`${formData.username}登录成功`);
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors({...response.data});
          }
        }
      });
  };

  const {form, setErrors} = useForm({
    initFormData,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    buttons: <button type="submit">登录</button>,
    onSubmit,
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
        user: JSON.parse(JSON.stringify(user))
      }
    };
  });



