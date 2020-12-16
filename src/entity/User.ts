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

@Entity()
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
}
