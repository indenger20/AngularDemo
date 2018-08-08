import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  @Input() postId: number;
  showTextarea: boolean;
  commentData: string;

  constructor(
    private commentService: CommentService
  ) {
    this.showTextarea = false;
  }

  ngOnInit() {
  }

  handleOpenArea() {
    this.showTextarea = true;
  }

  handleSave() {
    this.commentService.create(this.commentData, this.postId).subscribe(
      data => {
        console.log(data);
      },
      error => {

      });
  }

}
