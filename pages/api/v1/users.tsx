import {NextApiHandler} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body;

  // 表单验证
  const errors = {
    username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]
  };
  if (username.trim() === '') {
    errors.username.push('不能为空');
    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(errors));
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push('格式不合法');
  }
  if (username.trim().length > 42) {
    errors.username.push('太长');
  }
  if (username.trim().length < 3) {
    errors.username.push('太短');
  }
  if (password === '') {
    errors.password.push('不能为空');
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('密码不匹配');
  }
  const hasErrors = Object.values(errors).find(value => value.length > 0);
  res.setHeader('Content-Type', 'application/json; charset=utf8');
  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    // 连接数据库 创建用户
    const connection = await getDatabaseConnection(); // 第一次连接不能用 get
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end()
};

export default Users;
