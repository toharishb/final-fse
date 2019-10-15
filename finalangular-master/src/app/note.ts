import { Category } from './Category';
import { Reminder } from './Reminder'

export class Note {
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  category : Category;
  reminders: Array<Reminder>;
  noteCreatedBy:string;
constructor(){
 this.category = new Category();
 this.reminders = new Array<Reminder>();
 
}
  
}
