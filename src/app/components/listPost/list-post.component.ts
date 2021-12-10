import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts: Array<Post>) => {
      this.posts = posts;
    });
  }
}
