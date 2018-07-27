import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post } from '../_models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  @Input() postData?: any;
  post: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (!this.postData) {
      this.postService.getDetailPost(id).pipe(first()).subscribe(post => {
        this.post = post;
      });
    } else {
      this.post = this.postData;
    }
  }

}
