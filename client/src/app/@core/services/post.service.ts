import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../api/http.service';
import { createCommentResponse, MessageResponse } from '../models/message';
import { CreatePostRequest, Post, PostResponse, PostsResponse, SetLikeResponse } from '../models/post';
import { AccountSerivce } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private FollowUpsPosts$ = new BehaviorSubject<Post[]>([]);
  private userPosts$ = new BehaviorSubject<Post[]>([]);

  constructor(private readonly http: HttpService, private readonly accountService: AccountSerivce) {}

  public getFollowUpsPosts(): Observable<PostsResponse> {
    return this.http.get(`/post/getFollowUpsPosts/${this.accountService.getAccount.value!._id}`).pipe(
      tap({
        next: ({ posts }: PostsResponse) => {
          this.FollowUpsPosts$.next(posts);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  public setLikesPost(postId: string): Observable<SetLikeResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', this.accountService.getAccount.value!._id);
    queryParams = queryParams.append('postId', postId);

    return this.http.patch(`/post/like`, null, {
      params: queryParams,
    });
  }

  public createComment(credentials: any): Observable<createCommentResponse> {
    return this.http.post('/post/createComment', credentials);
  }

  public getPostComments(postId: string): Observable<MessageResponse> {
    return this.http.get(`/post/postComments/${postId}`);
  }

  public getUserPosts(userId: string | null): Observable<PostsResponse> {
    return this.http.get(`/post/getUserPosts/${userId}`).pipe(
      tap(({ posts }: PostsResponse) => {
        if (userId === this.accountService.getAccount.value?._id) {
          this.userPosts$.next(posts);
        }
      })
    );
  }

  public createPost(postCredentials: CreatePostRequest): Observable<PostResponse> {
    return this.http.post(`/post/createPost/${this.accountService.getAccount.value!._id}`, postCredentials).pipe(
      tap(({ post }) => {
        const posts: Post[] = this.userPosts$.value;
        posts.push(post);
        this.userPosts$.next(posts);
      })
    );
  }

  public editPost(postCredentials: CreatePostRequest): Observable<PostResponse> {
    return this.http.post(`/post/createPost/${this.accountService.getAccount.value!._id}`, postCredentials);
  }

  public deletePost(postId: string): Observable<PostResponse> {
    return this.http.delete(`/post/createPost/${postId}`);
  }

  public get FollowUpPosts(): BehaviorSubject<Post[]> {
    return this.FollowUpsPosts$;
  }
}
