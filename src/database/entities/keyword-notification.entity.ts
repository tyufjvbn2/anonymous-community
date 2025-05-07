import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("keyword_notifications")
export class KeywordNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  keyword: string;
}
