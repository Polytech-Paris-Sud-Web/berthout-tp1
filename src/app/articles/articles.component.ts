import {Component, OnInit} from '@angular/core';
import {Article} from "../article/article.component";
import {ArticleService} from "../article.service";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.articles()
      .subscribe(newArticles => this.articles = newArticles);
  }

  onDelete(article: Article): void {
    // Remove and update articles
    this.articleService
      .remove(article.id)
      .pipe(mergeMap(() => this.articleService.articles()))
      .subscribe(newArticles => this.articles = newArticles);
  }
}
