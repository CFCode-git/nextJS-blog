import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../Hooks/useForm';

const SignUp: NextPage = () => {

  const initFormData = {username: '', password: '', passwordConfirmation: '',};
  const {form, setErrors} = useForm({
    initFormData,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation',},
    ],
    buttons: <button type="submit">登录</button>,
    submit: {
      request(formData){
        return axios.post(`/api/v1/users`, formData)
          .then(response => response.data);
      },
      message: '提交成功'
    }
  });


  return (form);
};

export default SignUp;
