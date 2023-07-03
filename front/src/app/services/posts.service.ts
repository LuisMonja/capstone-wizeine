import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postGetted: EventEmitter<any> =  new EventEmitter();
  postsGetted: EventEmitter<any> =  new EventEmitter();
  constructor(private httpClient: HttpClient, private router: Router) { }

  publish(data: object) {
    const URL = `${environment.host}/posts`
    this.httpClient.post(URL, data)
      .subscribe({
        next: (res: any) => {
          this.router.navigateByUrl(`posts/${res.id}`)
        }
      })
  }

  async getPost(id: string) {
    const URL = `${environment.host}/posts/${id}`
    this.httpClient.get(URL)
      .subscribe({
        next: (res: any) => {
          this.postGetted.emit(res);
        }
      })
  }

  async getPosts() {
    const URL = `${environment.host}/posts`
    this.httpClient.get(URL)
      .subscribe({
        next: (res: any) => {
          this.postsGetted.emit(res);
        }
      })
  }

}
