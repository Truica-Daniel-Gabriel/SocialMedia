import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from "src/app/@core/models/post"
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  public posts: Post[]=[];
  private subscriptionPosts!:Subscription;
  constructor(private readonly postService:PostService) {}

  ngOnInit(): void {
    this.postService.getFollowUpsPosts().subscribe()
    this.subscriptionPosts= this.postService.FollowUpPosts.subscribe((FollowUpsPosts:Post[])=>{
      this.posts=FollowUpsPosts;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionPosts.unsubscribe();
  }
}
