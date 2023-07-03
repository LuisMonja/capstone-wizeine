import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  images: Set<any> = new Set()
  title: string = ''
  body: string = ''

  constructor (public authService: AuthService, private postService: PostsService){}

  uploaded({ files }: any) {
    Array.from<File>(files).forEach((file: File) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => this.images.add(fileReader.result);
    })
    
  }

  publish(){
    const data = {
      images: Array.from(this.images),
      title: this.title,
      body: this.body,
      username: this.authService.username
    }
    this.postService.publish(data)
  }
}
