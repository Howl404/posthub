import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from './shared/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'posthub';

  postsService = inject(PostsService);

  ngOnInit(): void {
    this.postsService
      .getPostsByLocationId('ms2hZ9CooLq1kaYvCRlF', 10, 0)
      .subscribe((value) => console.log(value));

    this.postsService.getPostById('1mfhEWaG9jTbJ1IpDfQL').subscribe((value) => console.log(value));
  }
}
