import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
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
import { RegisterComponent } from './access/admin-manager/register-admin/register.component';
import { UpdateAdminComponent } from './access/admin-manager/update-admin/update-admin.component';
import { DeleteAdminComponent } from './access/admin-manager/delete-admin/delete-admin.component';
import { AdminManagerComponent } from './access/admin-manager/admin-manager.component';
import { ClientsMessagesComponent } from './access/clients-messages/clients-messages.component';
import { StatsComponent } from './access/stats/stats.component';
import { InformationManagerComponent } from './access/information-manager/information-manager.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'about', component: AboutComponent, children: [
      { path: '', component: IlheuAtelierComponent },
      { path: 'arquitects', component: IlheuArquitectsComponent }
  ]},

  { path: 'projects', component: ProjectComponent, children: [
    { path: '', component: ProjectsComponent },
    { path: ':id', component: ProjectDetailComponent }
  ]},

  { path: 'contact', component: ContactComponent },

  { path: 'secretAdmin', component: AccessComponent, children: [

    { path: '', component: StatsComponent },

    { path: 'admin-manager', component: AdminManagerComponent, children: [
      { path: 'register', component: RegisterComponent},
      { path: 'update', component: UpdateAdminComponent },
      { path: 'delete', component: DeleteAdminComponent },
    ]},

    { path: 'information-manager', component: InformationManagerComponent },

    { path: 'messages-manager', component: ClientsMessagesComponent },

    { path: 'projects-manager', component: ProjectManagerComponent, children: [
      { path: 'add', component: AddProjectComponent },
      { path: 'update', component: UpdateProjectComponent },
      { path: 'delete', component: DeleteProjectComponent },
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
