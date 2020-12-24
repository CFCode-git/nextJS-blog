import {NextPage} from 'next';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../../Hooks/useForm';

const PostsNew: NextPage = () => {
  const onSubmit = (formData: typeof initFormData) => {
    axios.post(`/api/v1/posts`, formData)
      .then(() => {
        window.alert(`提交成功`);
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      });
  };
  const initFormData = {title: '', content: ''};
  const {form, setErrors} = useForm(
    initFormData,
    [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    <button type='submit'>提交</button>,
    onSubmit,
  );
  // const {form} = useForm();
  return (
    <div> {form} </div>
  );
};
export default PostsNew;


