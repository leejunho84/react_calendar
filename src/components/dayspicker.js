'use strict';

import React, { Component } from 'react';
import Day from './day';


export default class DaysPicker extends Component {
	_dateExchange(str){
		return (str.length>1)?str:'0'+str;
	}

	render(){
		let { pickerFunc, today, currentDate, startDate, endDate, days } = this.props;
		let templete = days.map((prop, index)=>{
			let temp = prop.map((prop, index)=>{

				if(prop){
					var currentDay = currentDate.year.toString() + this._dateExchange(currentDate.month.toString()) + this._dateExchange(prop.toString());
					var currentDayIS = (today == currentDay)?true:false;
					var startDayIS = (currentDay == startDate)?true:false;
					var betweenDayIS = (parseInt(startDate) < parseInt(currentDay) && parseInt(endDate) > parseInt(currentDay))?true:false;
					var endDayIS = (currentDay==endDate)?true:false;
					var disabledIS = (parseInt(startDate) > currentDay)?true:false;
					var clickIS = (!prop || disabledIS) ? false : true;
				}else{
					var clickIS = (!prop || disabledIS) ? false : true;
				}

				return (
					<Day 
						key={index}
						day={prop}
						currentDayIS={currentDayIS}
						startDayIS={startDayIS}
						betweenDayIS={betweenDayIS}
						endDayIS={endDayIS}
						disabledIS={disabledIS}
						clickIS={clickIS}
						onclick={pickerFunc} />
				)
			});
			return (<tr key={index}>{temp}</tr>);
		});

		return (
			<tbody>{templete}</tbody>
		)
	}
}