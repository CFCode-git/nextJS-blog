import {NextPage} from 'next';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../../Hooks/useForm';

const PostsNew: NextPage = () => {
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <button type='submit'>提交</button>,
    submit: {
      request(formData) {
        return axios.post(`/api/v1/posts`, formData);
      },
      message: '提交成功',
    }
  });
  return (
    <div> {form} </div>
  );
};
export default PostsNew;


