import { Injectable } from '@angular/core';
import { Reminder } from '../Reminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class ReminderService {

  reminder: Array<Reminder>
  reminde: Reminder;
  reminderSubject: BehaviorSubject<Array<Reminder>>;
  constructor(private httpclient: HttpClient, private authservice: AuthenticationService) {
    this.reminder = [];
    this.reminde = new Reminder();
    this.reminderSubject = new BehaviorSubject([]);
  }

  fetchRemindersFromServer() {
    return this.httpclient.get<Reminder[]>('http://localhost:9000/api/v1/reminder',
    {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(reminder => {
      console.log('success');
      this.reminder = reminder;
      this.reminderSubject.next(this.reminder);
    },
      (err: any) => {
        this.reminderSubject.error(err);
      });

  }

  getReminders(): BehaviorSubject<Array<Reminder>> {
    return this.reminderSubject;

  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    return this.httpclient.post<Reminder>('http://localhost:9000/api/v1/reminder', reminder,
     {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedReminder => {
      this.reminder.push(addedReminder);
      this.reminderSubject.next(this.reminder);
    }));
  }

  editReminder(reminder: Reminder): Observable<Reminder> {
    return this.httpclient.put<Reminder>(`http://localhost:9000/api/v1/reminder/${reminder.reminderId}`, reminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedReminder => {

      const constnote = this.reminder.find(n => n.reminderId === editedReminder.reminderId);
      Object.assign(constnote, editedReminder);
      this.reminderSubject.next(this.reminder);
    }));
  }

  getReminderById(reminderId): Reminder {
    
    const foundnote = this.reminder.find(reminder => reminder.reminderId == reminderId);
    
    return foundnote;
  }


   setReminder(reminder){
     this.reminde = reminder;
   }
   getReminder(){
    return this.reminde;
  }

  deleteReminder(reminder: Reminder): Observable<Reminder> {
    return this.httpclient.delete<Reminder>(`http://localhost:9000/api/v1/reminder/${reminder.reminderId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedReminder => {

      let index = this.reminder.indexOf(reminder);
      if (index >= 0) {
        this.reminder.splice(index, 1);
      }
      
      this.reminderSubject.next(this.reminder);
    }));
  }

}
