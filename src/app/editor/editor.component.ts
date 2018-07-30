import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailComponent } from '../detail/detail.component';
import { Post } from '../_models/';
import { PostService } from '../_services/post.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
@NgModule({
  declarations: [
    DetailComponent,
  ],
})
export class EditorComponent implements OnInit {
  title: string;
  pagePath: string;
  componentType: string;
  imagePath: string;
  imageName: string;
  editorForm: FormGroup;
  postData: Post;
  isPriview: boolean;
  submitted: boolean;
  maxDescLength: number;
  maxDescLengthCount: number;
  editorContent: string;
  postId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
  ) {
    this.maxDescLength = 100;
    this.maxDescLengthCount = this.maxDescLength;
    this.editorContent = '';
    this.imageName = 'Choose the image for post';

    this.pagePath = this.route.snapshot.routeConfig.path.split('/')[0];
    if (this.pagePath === 'newPost') {
      this.componentType = 'create';
      this.title = 'Create New Post';
    } else if (this.pagePath === 'editPost') {
      this.componentType = 'edit';
      this.title = 'Edit This Post';
      this.postService.getPostById(Number(this.route.snapshot.params.id)).pipe(first()).subscribe((post: Post) => {
        this.editorForm.patchValue({
          postImage: post.imagePath || '',
          postTitle: post.title || '',
          postDescription: post.description || ''
        });
        this.imagePath = post.imagePath;
        this.imageName = post.imageName;
        this.editorContent = post.descriptionFull;
        this.postId = post.id;
        this.updatePostData();
      });
    }
  }

  ngOnInit() {
    this.editorForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postImage: ['', Validators.required],
      postDescription: ['', Validators.required],
    });
    this.onChanges();
  }

  onChanges(): void {
    this.editorForm.valueChanges.subscribe(val => {
      this.maxDescLengthCount = this.maxDescLength - val.postDescription.length;
    });
  }

  get f() { return this.editorForm.controls; }

  updatePostData() {
    const postData = {
      title: this.f.postTitle.value,
      imagePath: this.imagePath,
      imageName: this.imageName,
      description: this.f.postDescription.value,
      descriptionFull: this.editorContent,
    };
    this.postData = new Post();
    for (const key in postData) {
      if (postData.hasOwnProperty(key)) {
        this.postData[key] = postData[key];
      }
    }
  }

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageName = e.target.files[0].name;
        this.imagePath = reader.result;
        this.editorForm.patchValue({
          postImage: reader.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);

    } else {
      this.imagePath = null;
      this.imageName = 'Choose the image for post';
      this.editorForm.patchValue({
        postImage: null
      });
    }
  }

  handlePreview(e, flag) {
    this.submitted = true;
    if (flag === false) {
      this.isPriview = flag;
      return;
    }
    if (this.editorForm.invalid) {
      return;
    }
    e.preventDefault();
    this.updatePostData();
    this.isPriview = flag;
  }

  handleSave(e) {
    e.preventDefault();
    this.updatePostData();
    if (this.componentType === 'create') {
      this.postService.create(this.postData).subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {

        });
    } else if (this.componentType === 'edit') {
      this.postData.id = this.postId;
      this.postService.update(this.postData).subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {

        });
    }
  }

}
