import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { Post } from '../_models/';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
@NgModule({
  declarations: [
    PostComponent,
  ],
})
export class EditorComponent implements OnInit {
  title: string;
  pagePath: string;
  componentType: string;
  imagePath: string;
  imageUrl: string;
  imageName: string;
  editorForm: FormGroup;
  postData: Post;
  isPriview: boolean;
  submitted: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pagePath = this.route.snapshot.routeConfig.path;
    if (this.pagePath === 'newPost') {
      this.componentType = 'create';
      this.title = 'Create New Post';
    } else if (this.pagePath === 'editPost') {
      this.componentType = 'edit';
      this.title = 'Edit This Post';
    }

    this.imageName = 'Choose the image for post';

    this.editorForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postImage: [null, Validators.required],
      postDescription: ['', Validators.required],
    });
  }

  get f() { return this.editorForm.controls; }

  updatePostData() {
    const postData = {
      title: this.f.postTitle.value,
      imagePath: this.imagePath,
      imageName: this.imageName,
      description: this.f.postDescription.value,
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
        this.imageUrl = event.target.result;
        this.imageName = e.target.files[0].name;
        this.imagePath = reader.result;
        this.editorForm.patchValue({
          postImage: reader.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);

    } else {
      this.imageUrl = null;
      this.imagePath = null;
      this.imageName = 'Choose the image for post';
      this.editorForm.patchValue({
        file: null
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
    this.postService.create(this.postData).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {

      });
  }

}
