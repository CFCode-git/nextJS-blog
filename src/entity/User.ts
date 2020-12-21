import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(type => Post, post => post.author)
  @JoinColumn()
  posts: Post[];
  @OneToMany(type => Comment, comment => comment.user)
  @JoinColumn()
  comments: Comment[];


  // 表示 errors password passwordConfirmation 不是在数据库上面的, 但是在 User 类上面
  errors = {
    username: [] as string[], password: [] as string[],
    passwordConfirmation: [] as string[]
  };
  password: string;
  passwordConfirmation: string;

  async validate() {
    if (this.username.trim() === '') {
      this.errors.username.push('不能为空');
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push('格式不合法');
    }
    if (this.username.trim().length > 42) {
      this.errors.username.push('太长');
    }
    if (this.username.trim().length < 3) {
      this.errors.username.push('太短');
    }
    const found = (await getDatabaseConnection()).manager.find(
      User, {username: this.username});
    if (found) {
      this.errors.username.push('用户名已存在');
    }
    if (this.password === '') {
      this.errors.password.push('不能为空');
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('密码不匹配');
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(value => value.length > 0);
  }
}
