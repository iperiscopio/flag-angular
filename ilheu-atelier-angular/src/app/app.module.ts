import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { IlheuAtelierComponent } from './about/ilheu-atelier/ilheu-atelier.component';
import { IlheuArquitectsComponent } from './about/ilheu-arquitects/ilheu-arquitects.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { AccessComponent } from './access/access.component';
import { ProjectManagerComponent } from './access/project-manager/project-manager.component';
import { AddProjectComponent } from './access/project-manager/add-project/add-project.component';
import { UpdateProjectComponent } from './access/project-manager/update-project/update-project.component';
import { DeleteProjectComponent } from './access/project-manager/delete-project/delete-project.component';
import { AdminManagerComponent } from './access/admin-manager/admin-manager.component';
import { RegisterComponent } from './access/admin-manager/register-admin/register.component';
import { UpdateAdminComponent } from './access/admin-manager/update-admin/update-admin.component';
import { DeleteAdminComponent } from './access/admin-manager/delete-admin/delete-admin.component';
import { ClientsMessagesComponent } from './access/clients-messages/clients-messages.component';
import { StatsComponent } from './access/stats/stats.component';
import { InformationManagerComponent } from './access/information-manager/information-manager.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FrontofficeService } from './shared/frontoffice.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    IlheuAtelierComponent,
    IlheuArquitectsComponent,
    ContactComponent,
    ProjectComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    AccessComponent,
    ProjectManagerComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,
    RegisterComponent,
    AdminManagerComponent,
    UpdateAdminComponent,
    DeleteAdminComponent,
    ClientsMessagesComponent,
    StatsComponent,
    InformationManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [FrontofficeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
