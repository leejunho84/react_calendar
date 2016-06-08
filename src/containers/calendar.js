'use strict';

import React, {Component} from 'react';
import YearMonthPicker from '../components/yearmonthpicker';
import DaysPicker from '../components/dayspicker';

export default class Calendar extends Component{
	constructor(){
		super();

		this.choiceIS = false,
		this.weeks = ['일', '월', '화', '수', '목', '금', '토'];
		this.lastMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		this.state = {
			startWeek:0,
			currentDays:[],
			choiceIS:false,
			currentDate:{
				year:1583,
				month:0
			},
			todayDate:0,
			startDate:0,
			endDate:0
		}
	}

	componentDidMount(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();

		this.setState({todayDate:year.toString()+this._dateExchange(month.toString())+this._dateExchange(day.toString())});
		this._reState(year, month);
	}

	_changeDate(date){
		return date.slice(/\s{4}\s{2}\s{2}/);
	}

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
					year:year,
					month:month
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

	_monthPickerFunc(counter){
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


	_dateExchange(str){
		return (str.length>1)?str:'0'+str;
	}

	_dayPickerFunc(day){
		this.setState((state)=>{
			var date = state.currentDate.year.toString() + this._dateExchange(state.currentDate.month.toString()) + this._dateExchange(day.toString());
			if(!state.choiceIS){
				state.choiceIS = true;
				return {
					startDate:date,
					endDate:0
				}
			}else{
				state.choiceIS = false;
				return {
					endDate:date
				}
			}
		});
	}

	render(){
		let weeks = this.weeks.map(function(prop, index){
			return <th key={index}>{prop}</th>
		});
		return (
			<div id="calendar">
				<YearMonthPicker pickerFunc={(counter)=>this._monthPickerFunc(counter)} currentDate={this.state.currentDate} />
				<table className="calendar">
					<caption>달력</caption>
					<thead>
						<tr>{weeks}</tr>
					</thead>
					<DaysPicker 
						today={this.state.todayDate}
						currentDate={this.state.currentDate} 
						startDate={this.state.startDate} 
						endDate={this.state.endDate}
						days={this.state.currentDays} 
						pickerFunc={(day)=>this._dayPickerFunc(day)} />
				</table>
			</div>
		)
	}
}