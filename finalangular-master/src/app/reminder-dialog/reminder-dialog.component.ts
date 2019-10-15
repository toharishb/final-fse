import { Component, OnInit, Inject } from '@angular/core';
import { Reminder } from '../Reminder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderService } from '../services/reminder.service'

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css']
})
export class ReminderDialogComponent implements OnInit {

  reminderTypes: Array<String> = [
    'Hourly',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly'
  ];
  reminder: Reminder;
  constructor(public dialogRef: MatDialogRef<ReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
  private reminderservice : ReminderService) {
    this.reminder = data;
   }

  ngOnInit() {
  }

  addreminder(){
    this.reminder.reminderCreatedBy = sessionStorage.getItem('userName');
    this.reminderservice.setReminder(this.reminder);
    this.dialogRef.close();
    
  }
}
