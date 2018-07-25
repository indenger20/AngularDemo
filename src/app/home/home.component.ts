import { Component, OnInit, NgModule } from '@angular/core';
import { first } from 'rxjs/operators';

import { Post } from '../_models';
import { PostService } from '../_services';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@NgModule({
  declarations: [
    PostComponent,
  ],
})
export class HomeComponent implements OnInit {
  currentPost: Post;
  posts: Post[] = [];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.loadAllPosts();
  }

  private loadAllPosts() {
    this.postService.getAll().pipe(first()).subscribe(posts => {
      this.posts = posts;
    });
  }
}
