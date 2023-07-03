import { Component, HostListener } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from "src/environment";

interface post {
  _id: string
  title: string,
  body: string,
  username: string,
  images: Array<string>,
  height: number,
  background: string
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  posts: Array<post> = []
  socket = io(environment.socketServer);
  postsByLine: Array<Array<post>> = [];
  constructor(private postService: PostsService, private router: Router) { }

  goToPost(id: string) {
    this.router.navigateByUrl(`/posts/${id}`);
  }

  setPosts() {
    this.postService.getPosts();
    this.postService.postsGetted.subscribe((posts: Array<post>) => {
      posts.forEach(p => {
        p.height = Math.random() * 175 + 120
        p.background = p.images[0] ? p.images[0] : '';
      });
      this.posts = posts;
      this.ordenarPosts(window.innerWidth)
    })
  }

  ordenarPosts(width: number) {
    if (width > 1024) width = 1024;
    const columns = Math.floor((width / 230) - 1);
    this.postsByLine = [];
    let actualPosition = 0;
    for (const p of this.posts) {
      if (this.postsByLine[actualPosition]) this.postsByLine[actualPosition].push(p);
      else this.postsByLine[actualPosition] = [p]
      if (actualPosition < columns) actualPosition += 1;
      else actualPosition = 0;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ordenarPosts(window.innerWidth);
  }
  ngOnInit(): void {
    this.setPosts();
    this.socket.on('AddedPost', () => this.setPosts())
  }
}
