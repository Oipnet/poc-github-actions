import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Post } from '../interfaces/Post';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retreive all posts', (done: DoneFn) => {
    const exceptedPost: Post[] = [
      { id: 1, title: 'Post de test', body: 'Body de test' },
      { id: 2, title: 'Post de test 2', body: 'Body de test 2' },
    ];

    httpClientSpy.get.and.returnValue(of(exceptedPost));

    service.getAll().subscribe((posts: Post[]) => {
      expect(posts).toEqual(exceptedPost, 'excepted posts');

      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toEqual(1, 'one call');
  });
});
