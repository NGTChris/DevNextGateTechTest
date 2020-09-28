import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface FirebaseData {
  index: string;
  fund_name: string;
  subfund_name: string;
  share_class_name: string;
  date: string;
  report_status: string;
  nb_alerts: string;
}

const ELEMENT_DATA: FirebaseData[] = [
  {index: '0', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class A', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '1', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class B', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '2', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class C', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '3', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class D EUR Hedged', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '4', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class E USD', date: '20200504', report_status: 'true', nb_alerts: '3'},
  {index: '5', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '6', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class M', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '7', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class P USD', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '8', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class K SGD', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '9', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G', date: '20200504', report_status: 'false', nb_alerts: '1'},
  {index: '10', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class H EUR Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '11', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class B', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '12', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class C', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '13', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class D EUR Hedged', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '14', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class E USD', date: '20200504', report_status: 'true', nb_alerts: '3'},
  {index: '15', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '16', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class M', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '17', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class P USD', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '18', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class K SGD', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '19', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class B', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '20', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class C', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '21', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class D EUR Hedged', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '22', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class E USD', date: '20200504', report_status: 'true', nb_alerts: '3'},
  {index: '23', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '24', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class M', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '25', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class P USD', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '26', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class K SGD', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '27', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class H EUR Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '28', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class B', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '29', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class C', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '30', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class D EUR Hedged', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '31', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class E USD', date: '20200504', report_status: 'true', nb_alerts: '3'},
  {index: '32', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '33', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class M', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '34', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class P USD', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '35', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class K SGD', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '36', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class B', date: '20200504', report_status: 'true', nb_alerts: '4'},
  {index: '37', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class C', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '38', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class D EUR Hedged', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '39', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class E USD', date: '20200504', report_status: 'true', nb_alerts: '3'},
  {index: '40', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class G Hedged', date: '20200504', report_status: 'true', nb_alerts: '2'},
  {index: '41', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class M', date: '20200504', report_status: 'false', nb_alerts: '0'},
  {index: '42', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class P USD', date: '20200504', report_status: 'true', nb_alerts: '0'},
  {index: '43', fund_name: 'Three Sigma', subfund_name: 'High Volatility', share_class_name: 'Class K SGD', date: '20200504', report_status: 'true', nb_alerts: '4'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  title = 'Dev Next Gate Tech Firebase Test';

  itemValue = '';
  items: Observable<any[]>;
 
  displayedColumns: string[] = ['index', 'fund_name', 'subfund_name', 'share_class_name', 'date', 'report_status', 'nb_alerts'];
  dataSource = new MatTableDataSource<FirebaseData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
