import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  options1: any;
  options2: any;
  options3: any;

  localRes1: any;
  disRes1: any;

  localRes2: any;
  disRes2: any;

  localRes3: any;
  disRes3: any;

  start: any;
  localEnd: any;
  disEnd: any;

  xAxisData = ['Comparison'];

  constructor( private snackBar: MatSnackBar, private as: AppService) { }

  ngOnInit() {

  }

  execute1() {
    let sql = 'select name, location from customer';
    this.start = new Date().getTime();
    let that = this;
    this.as.executeSQLtoLocal(sql)
      .then(res => {
        that.localRes1 = res;
        that.localEnd = new Date().getTime();
      });
    this.as.executeSQLtoDistributed(sql)
      .then(res => {
        that.disRes1 = res;
        that.disEnd = new Date().getTime();
        this.options1 = this.createOptions(that.disEnd - that.start,
          that.localEnd - that.start);
        that.snackBar.open('SQL执行完毕', '确定', {
          duration: 2000,
        });
        console.log(that.disEnd - that.start);
        console.log(that.disEnd);
        console.log(that.start);
      });
  }

  execute2() {
    let sql = 'select category, count(category) from items group by category';
    this.start = new Date().getTime();
    let that = this;
    this.as.executeSQLtoLocal(sql)
      .then(res => {
        that.localRes2 = res;
        that.localEnd = new Date().getTime();
      });
    this.as.executeSQLtoDistributed(sql)
      .then(res => {
        that.disRes2 = res;
        that.disEnd = new Date().getTime();
        this.options2 = this.createOptions(that.disEnd - that.start,
          that.localEnd - that.start);
        that.snackBar.open('SQL执行完毕', '确定', {
          duration: 2000,
        });
        console.log(that.disEnd - that.start);
        console.log(that.disEnd);
        console.log(that.start);
      });
  }

  execute3() {
    let sql = 'select items.name, relation.create_data from items join relation on relation.item_id = items.id'
    this.start = new Date().getTime();
    let that = this;
    this.as.executeSQLtoLocal(sql)
      .then(res => {
        that.localRes3 = res;
        that.localEnd = new Date().getTime();
      });
    this.as.executeSQLtoDistributed(sql)
      .then(res => {
        that.disRes3 = res;
        that.disEnd = new Date().getTime();
        this.options3 = this.createOptions(that.disEnd - that.start,
          that.localEnd - that.start);
        that.snackBar.open('SQL执行完毕', '确定', {
          duration: 2000,
        });
        console.log(that.disEnd - that.start);
        console.log(that.disEnd);
        console.log(that.start);
      });
  }


  createOptions(data1: number, data2: number) {
    return new Object({
      legend: {
        data: ['hive()', 'postgresSQL(local)'],
        align: 'left'
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      width: '200px',
      heigth: '360px',
      grid: {
        left: '17%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {},
      series: [{
        name: 'local',
        type: 'bar',
        data: [data1],
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: 'distributed',
        type: 'bar',
        data: [data2],
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    });
  }
}
