import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  title: string = '';
  body: string = '';
  username: string = '';
  images: Array<string> = [];
  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.postsService.getPost(params.postid);
      this.postsService.postGetted.subscribe(({ title, body, username, images }) => {
        this.title = title;
        this.body = body;
        this.username = username;
        this.images = images;
      })
    })
  }

}
