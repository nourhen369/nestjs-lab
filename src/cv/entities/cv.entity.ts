import { Skill } from "../../skill/entities/skill.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export class Cv /*extends TimestampEntity*/{
  @PrimaryGeneratedColumn("uuid")
   id: Number ;
  
  @Column()
   name: string ;
 
  @Column()
   firstname: string ;
  
   @Column()
   age: number ;

   @Column()
   cin : number ;
   
   @Column()
   job: string ;

   @Column()
   path: string ;

   @ManyToOne(
    type => User,
    (user)=> user.cvs ,
  
   )
   user :User ;
   
   @ManyToMany(() => Skill, (skill) => skill.cvs, { cascade: ['insert'] })
   @JoinTable({
     name: "cv-skills",
     joinColumn: {
       name: "cv",
       referencedColumnName: "id",
     },
     inverseJoinColumn: {
       name: "skill",
       referencedColumnName: "id",
     },
   })
   skills: Skill[];
   
}

