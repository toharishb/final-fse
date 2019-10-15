import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NotesService } from './services/notes.service';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationService } from './services/registration.service';
import { ReminderDialogComponent } from './reminder-dialog/reminder-dialog.component';
import { ReminderService } from './services/reminder.service';
import { CategoryService } from './services/category.service';
import { InterceptorService } from './services/interceptor.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserService } from './services/user.service';
import { CategoryViewComponent } from './category-view/category-view.component';
import { RemindersViewComponent } from './reminders-view/reminders-view.component';
import { CategoryComponent } from './category/category.component';
import { RemindersComponent } from './reminders/reminders.component';
const routes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard],
    
    children: [
      { path: 'userprofile', component: UserprofileComponent,pathMatch:'full' },
      { path: 'category', component: CategoryViewComponent,pathMatch:'full' },
      { path: 'reminders', component: RemindersViewComponent,pathMatch:'full' },

      { path: 'view/noteview', component: NoteViewComponent,pathMatch:'full' },
      { path: 'view/listview', component: ListViewComponent,pathMatch:'full' },
      {path: 'note/:noteid/edit', component: EditNoteOpenerComponent,outlet: 'noteEditOutlet'},
  { path: '', redirectTo: 'view/noteview', pathMatch: 'full' }

    ]
  },{
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    RegisterComponent,
    ReminderDialogComponent,
    CategoryDialogComponent,
    UserprofileComponent,
    CategoryViewComponent,
    RemindersViewComponent,
    CategoryComponent,
    RemindersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    RegistrationService,
    ReminderService,
    CategoryService,
    UserService,
    InterceptorService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [EditNoteViewComponent,ReminderDialogComponent,CategoryDialogComponent]
})

export class AppModule { }
