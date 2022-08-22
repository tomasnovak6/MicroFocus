import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PostService} from "../../_services/post.service";
import {IUserPost} from "../../_interfaces/IUserPost";
import {IUser} from "../../_interfaces/IUser";
import {UserService} from "../../_services/user.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['user', 'post'];
  dataSource = new MatTableDataSource<IUserPost[]>([]);

  users: IUser;
  posts: any[] = [];
  welcome: string = '';

  stateMessage: string = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {message: string};

    if (state && state.message && state.message !== '') {
      this.stateMessage = state.message;
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getPosts();
    this.setWelcome();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsers(id: number | string): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.find(x => x.id === id);
    });
  }

  getPosts(): void {

    this.postService.getPosts().subscribe(posts => {
      posts.map(post => {
        this.getUsers(post.userId);

         this.posts.push({
           id: post.id,
           userName: this.users['name'],
           userCompany: this.users['company']['name'],
           website: this.users['website'],
           title: post.title,
           body: post.body
         });
      });

      this.dataSource = new MatTableDataSource<IUserPost[]>(this.posts);
    });

  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logOut(): void {
    this.authenticationService.logOut();
    this.setWelcome();
  }

  setWelcome(): void {
    this.welcome = this.authenticationService.getWelcome();
  }

}
