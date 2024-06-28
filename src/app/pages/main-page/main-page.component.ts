import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TableHeader } from '../../shared/table/table-header.model';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../post.model';
import { ViewService } from '../../shared/view-switcher/view.service';
import { ViewMode } from '../../shared/view-switcher/view-mode.enum';

export interface CityData {
  name: string;
  country: string;
  population: number;
  area_km2: number;
  founded: string;
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  private readonly postsService = inject(PostsService);

  private readonly viewService = inject(ViewService);

  headers: TableHeader<Post>[] = [
    { value: 'Name', propertyKey: 'authorName' },
    { value: 'Title', propertyKey: 'title' },
    { value: 'Description', propertyKey: 'description' },
    { value: 'Upvotes', propertyKey: 'upvotes' },
    { value: 'Date', propertyKey: 'date' },
  ];

  readonly viewMode$: Observable<ViewMode> = this.viewService.viewMode$;

  readonly data$: Observable<Post[]> = this.postsService.getPosts(30, 0);
}
