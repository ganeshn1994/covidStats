import { Component, OnInit } from '@angular/core';
import { ColumnSetting } from 'src/app/models/column-setting';
import { StatCountryService } from 'src/app/services/stat-country.service';
import { ModalService } from 'src/app/services';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css']
})
export class StatsDashboardComponent implements OnInit {
  allCountryDataArray: any[] = [];
  keyword = 'country';
  statsDisplay: boolean = false;
  position: string;
  latitude = 20;
  longitude = 77;
  data: any;
  allStatsData: any[] = [];
  coutryDisplay = 'coutryDisplayModalId';

  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
  ];

  dataSettings: ColumnSetting[] = [
    {
      primaryKey: 'country',
      header: 'Country Name',
      specialKeys: [
        {
          key: 'flag',
          alternativeKeys: 'image'
        }
      ]
    },
    {
      primaryKey: 'cases',
      header: 'Total Cases'
    },
    {
      primaryKey: 'todayCases',
      header: 'Todays Cases'
    },
    {
      primaryKey: 'deaths',
      header: 'Total Deaths'
    },
    {
      primaryKey: 'todayDeaths',
      header: 'Today Deaths'
    },
    {
      primaryKey: 'recovered',
      header: 'Total Recovered'
    },
    {
      primaryKey: 'active',
      header: 'Total Active'
    },
    {
      primaryKey: 'critical',
      header: 'Critical Cases'
    }
  ];

  tableSettings: any = {
    class: 'table-bordered',
    align: 'text-center'
  };
  label: string[];
  StatValue: unknown[];

  constructor(
    private statsService: StatCountryService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getAllData();
    this.getCountryData();
  }

  showCountryDialog() {
    this.modalService.openModal(this.coutryDisplay);
  }

  showStatsDialog() {
    this.statsDisplay = true;
    this.position = 'right';
  }

  getAllData() {
    this.statsService.getAllData().subscribe(data => {
      this.allStatsData.push(data);
      this.label = Object.keys(data);
      this.label.splice(-1, 1);
      this.StatValue = Object.values(data);
      this.StatValue.splice(-1, 1);
      console.log(this.StatValue);
      console.log(this.label);
      this.data = {
        labels: this.label,
        datasets: [
          {
            data: this.StatValue,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      };
    });
  }

  getCountryData() {
    this.statsService.getAllCountryData().subscribe(data => {
      data.forEach(element => {
        this.markers.push(element.countryInfo);
        element.flag = element.countryInfo.flag;
      });
      this.allCountryDataArray = data;
    });
  }
  keyUpdateValue(event: any) {}
  selectedData(event: any) {
    this.allCountryDataArray = [];
    this.allCountryDataArray.push(event);
  }
  clearSearch(event: any) {
    this.getCountryData();
  }
  editModule(event: any) {}
  viewData(event: any) {}

  addMarker(lat: number, long: number) {
    this.markers.push({ lat, long, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'long'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'long'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    console.log(event);
    this.selectedMarker = {
      lat: event.latitude,
      long: event.longitude
    };
  }
  closeModal(event: any) {}
}
