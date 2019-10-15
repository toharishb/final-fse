import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { Input } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  @Input()
  note : Note;
  constructor() { }

  ngOnInit() {
  }

}
