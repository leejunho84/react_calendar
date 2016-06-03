'use strict';

import React, {Component} from 'react';
import YearMonthPicker from '../components/yearmonthpicker';
import DaysPicker from '../components/dayspicker';

export default class Calendar extends Component{
	constructor(){
		super();

		this.weeks = ['일', '월', '화', '수', '목', '금', '토'];
		this.lastMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		this.state = {
			currentDate:{
				year:1983, 	//올해
				month:0 	//이번달 0 ~ 11
			},
			startWeek:0,
			currentDays:[],
			startDate:{
				year:0,
				month:0
			},
			endDate:{
				year:0,
				month:0
			}
		}
	}

	componentDidMount(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();

		this._reState(year, month);
	}

	/*shouldComponentUpdate(props, state){
		console.log(state);
		return true;
	}*/


	_reState(year, month){
		var yunIS = (((year%4)==0&&(year%100)!=0)||(year%400)==0)?true:false;
		this.lastMonthDay[1] = (yunIS)?29:28;

		var startYear = 1583; //율리우스력에서 그레고리력 방식변경 시작시점
		var yunYear = this._translateYear(year) - this._translateYear(startYear);  //1583년 ~ 올해 까지 윤년의 합
		var normalYear = year - startYear - yunYear; //1983년 ~ 올해 까지 평년의 합

		//1583년 1월 1일은 토요일 ( 6 )
		//(X + (( 평년합 X 1 + 윤년합 X 2 ) % 7)) % 7
		var week = (6+((normalYear+(yunYear*2)) % 7)) % 7; //올해 1월 1일의 요일
		var startWeek = (this._translateDays(month) + week) % 7; //이번달 시작 요일
		var matrixDays = this._daysTable(startWeek, month);

		this.setState((state)=>{
			return {
				currentDate:{
					year:year, //올해
					month:month //이번달 0 ~ 11
				},
				startWeek:startWeek,
				currentDays:matrixDays
			}
		});
	}


	_daysTable(week, month){
		var totalCell = this.lastMonthDay[month]+week;
		var totalColumn = Math.ceil(totalCell / 7);
		var arrCell = this._arrMatrix(week, totalCell);
		var arrTable = [];

		for(var i=0;i<totalColumn;i++){
			let arr = [];
			for(var j=0;j<7;j++){
				arr.push(arrCell[j+(i*7)]);
			}
			arrTable.push(arr);
		}

		return arrTable;
	}

	_arrMatrix(week, totalCell){
		var arr = [];
		for(var i=1; i<=totalCell;i++){
			if(i>week) arr.push(i-week);
			else arr.push(undefined);
		}
		return arr;
	}

	_translateDays(month){
		var days = 0;
		for(var i=0; i<month; i++){
			days += this.lastMonthDay[i];
		}
		return days;
	}

	_translateYear(year){
		return Math.floor((year-1)/4) - Math.floor((year-1)/100) + Math.floor((year-1)/400);
	}

	_pickerFunc(counter){
		var year = this.state.currentDate.year;
		var month = counter;

		if(month < 0){
			year -= 1;
			month = 11;
		}else if(month > 11){
			year += 1;
			month = 0;
		}

		this._reState(year, month);
	}

	_dayPickerFunc(day){
		console.log(day);
	}

	render(){
		let weeks = this.weeks.map(function(prop, index){
			return <th key={index}>{prop}</th>
		});
		return (
			<div id="calendar">
				<YearMonthPicker pickerFunc={(counter)=>this._pickerFunc(counter)} currentDate={this.state.currentDate} />
				<table className="calendar">
					<caption>달력</caption>
					<thead>
						<tr>{weeks}</tr>
					</thead>
					<DaysPicker currentDate={this.state.currentDate} days={this.state.currentDays} pickerFunc={(day)=>this._dayPickerFunc(day)} />
				</table>
			</div>
		)
	}
}