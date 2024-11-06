import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-weather-report',
  standalone: true,
  imports: [],
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.css'
})
export class WeatherReportComponent implements OnInit {
  data$: Observable<any> | undefined;

  constructor(
    private weatherService: WeatherServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Our route params observable
    this.data$ = this.route.params.pipe(
      map((params) => params["locationName"]),
      filter( (name) => !!name),
      tap( () => {
        this.loading = true;
      }),
      concatMap( (name) => this.weatherService.getWeatherForCity(name)),
      tap( (() => {
        this.loading = false;
      }))
    );
  }

}
