import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import Form from '../components/Form';
import {useForm} from '../Hooks/useForm';

const SignUp: NextPage = () => {

  const initFormData = {username: '', password: '', passwordConfirmation: '',};
  const onSubmit = (formData: typeof initFormData) => {
    axios.post(`/api/v1/users`, formData)
      .then(() => {
        window.alert(`${formData.username}注册成功`);
        window.location.href = '/sign_in';
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
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation',},
    ],
    buttons: <button type="submit">登录</button>,
    onSubmit,
  });


  return (form);
};

export default SignUp;
