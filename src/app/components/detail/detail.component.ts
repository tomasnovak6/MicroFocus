import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {PostService} from "../../_services/post.service";
import {IPost} from "../../_interfaces/IPost";
import {AuthenticationService} from "../../_services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogAnimationsExampleDialogComponent
} from "../shared/dialog-animations-example-dialog/dialog-animations-example-dialog.component";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  postForm: FormGroup;
  id: number;
  mode: 'new' | 'edit';
  private params: any;
  postDetail: IPost = null;
  headline: string = '';
  welcome: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.params = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.mode = params['mode'];
    });

    this.setHeadline()
    this.setWelcome();
    this.setPost();

    this.postForm = this.fb.group({
      title: [(this.mode === 'edit' ? this.postDetail.title: ''), [Validators.required, Validators.maxLength(200)]],
      body: [(this.mode === 'edit' ? this.postDetail.body : ''), [Validators.required, Validators.maxLength(2000)]],
    });
  }

  get f() { return this.postForm.controls; }

  hasErrors(): boolean {
    if (this.f.title.errors || this.f.body.errors) {
      return true;
    } else {
      return false;
    }
  }

  setPost(): void {
    // used the same service here, because the data are faked
    this.postService.getPosts().subscribe(post => {
      this.postDetail = post.filter(x => x.id === this.id)[0];
    });
  }

  setHeadline(): void {
    if (this.mode === 'edit') {
      this.headline = 'Edit Post';
    } else if (this.mode === 'new') {
      this.headline = 'New Post';
    }
  }

  setWelcome(): void {
    this.welcome = this.authenticationService.getWelcome();
  }

  goBack(): void {
    let dialogRef = this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  onDelete(): void {
    let navigationExtras: NavigationExtras;
    let dialogRef = this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.removePost(this.id);
        navigationExtras = {state: {message: 'Post was deleted successfully'}};
        this.router.navigate(['/'], navigationExtras);
      }
    });
  }

  onSubmit(): void {
    let navigationExtras: NavigationExtras;
    if (this.f.title.value && this.f.body.value) {
      if (this.mode === 'edit') {
        this.postService.updatePost(this.id, this.f.title.value, this.f.body.value);
        navigationExtras = {state: {message: 'Post was updated successfully'}};
        this.router.navigate(['/'], navigationExtras);
      } else {
        this.postService.insertPost(this.f.title.value, this.f.body.value);
        navigationExtras = {state: {message: 'A new post was saved successfully'}};
        this.router.navigate(['/'], navigationExtras);
      }
    }

  }

}
