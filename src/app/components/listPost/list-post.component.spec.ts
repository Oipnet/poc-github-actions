import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';

import { ListPostComponent } from './list-post.component';

class PostServiceStub {
  getAll() {
    return of([
      { id: 1, title: 'Post de test 1', body: 'Body de test 1' },
      { id: 2, title: 'Post de test 2', body: 'Body de test 2' },
    ]);
  }
}

describe('ListPostComponent', () => {
  let component: ListPostComponent;
  let fixture: ComponentFixture<ListPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ListPostComponent],
      providers: [{ provide: PostService, useClass: PostServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of 2 posts', () => {
    expect(component.posts.length).toBeLessThanOrEqual(2);
  });

  it('should diplay the title of each post', () => {
    const listPostElement: HTMLElement = fixture.nativeElement;

    const liElements: NodeList = listPostElement.querySelectorAll('li');

    expect(liElements.length).toEqual(2);
    liElements.forEach((liElement: Node, key: number) => {
      expect(liElement.textContent).toContain(`Post de test ${key + 1}`);
    });
  });
});
