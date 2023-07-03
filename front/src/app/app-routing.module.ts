import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { PostComponent } from './views/post/post.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'posts/new', component: NewPostComponent},
  {path:'posts/:postid', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
 }
