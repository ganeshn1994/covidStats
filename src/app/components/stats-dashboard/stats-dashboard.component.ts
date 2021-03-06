import { Component, OnInit } from '@angular/core';
import { ColumnSetting } from 'src/app/models/column-setting';
import { StatCountryService } from 'src/app/services/stat-country.service';
import { ModalService } from 'src/app/services';
import { Observable } from 'rxjs';
import { ZoomControlStyle } from '@agm/core';

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
  updatedate: Date;
  allStatsData: any[] = [];
  coutryDisplay = 'coutryDisplayModalId';
  label: string[];
  StatValue: unknown[];
  callFunction = {
    seconds: 1000
  };
  isOpen: boolean = true;
  disableAutoPan: boolean = true;
  setVisible: boolean = true;
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

  constructor(
    private statsService: StatCountryService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getAllData();
    this.getCountryData();

    const progressInterval = setInterval(() => {
      this.callFunction.seconds = this.callFunction.seconds - 1;
      if (this.callFunction.seconds === 1) {
        this.getAllData();
        this.getCountryData();
        this.callFunction.seconds = 1000;
      }
    }, 1000);
    console.log(ZoomControlStyle);
  }

  zoomChange(event: any) {
    console.log(event);
    if (event < 5) {
      this.isOpen = false;
      this.disableAutoPan = false;
      this.setVisible = false;
    } else {
      this.isOpen = true;
      this.disableAutoPan = true;
      this.setVisible = true;
    }
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
      this.updatedate = data.updated;
      console.log(this.updatedate);
      this.allStatsData.splice(-1, 1);
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
        element.radius = element.cases * 40;
        this.markers.push(element);
        element.flag = element.countryInfo.flag;
      });
      this.allCountryDataArray = data;
    });
  }
  keyUpdateValue(event: any) {}
  selectedData(event: any) {
    console.log(event);
    this.latitude = event.countryInfo.lat;
    this.longitude = event.countryInfo.long;
    this.allCountryDataArray = [];
    this.allCountryDataArray.push(event);
  }
  clearSearch() {
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
