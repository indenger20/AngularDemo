import { Component, OnInit } from '@angular/core';
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
  post: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.params.id;
    this.postService.getDetailPost(id).pipe(first()).subscribe(post => {
      this.post = post;
    });
  }

  ngOnInit() {
  }

}
