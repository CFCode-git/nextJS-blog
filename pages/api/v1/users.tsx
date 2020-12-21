import {NextApiHandler} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body;
  // 连接数据库 创建用户
  const connection = await getDatabaseConnection();

  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  // 表单验证
  await user.validate();
  res.setHeader('Content-Type', 'application/json; charset=utf8');
  if (user.hasErrors()) {
    res.statusCode = 422;
    res.write(JSON.stringify(user.errors));
  } else {
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end()
};

export default Users;
