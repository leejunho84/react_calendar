'use strict';

import React, { Component } from 'react';


export default class DaysPicker extends Component {
	constructor(){
		super()

		var date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth();
		this.day = date.getDate();
	}

	_onClick(e){
		console.log(this);
		//this.props.pickerFunc(1);
	}

	render(){
		let { currentDate, days } = this.props;
		let templete = days.map((prop, index)=>{
			let temp = prop.map((prop, index)=>{
				let currentDayIS = (currentDate.year == this.year && currentDate.month == this.month && prop == this.day) ? true : false;
				return (
					<td className={(currentDayIS)?'days today':'days'} 
						key={index}
						onClick={(e)=>{console.log(this)}} 
						data-date={prop}>
						<span>{prop}</span>
					</td>
				)
			});
			return (<tr key={index}>{temp}</tr>);
		});

		return (
			<tbody>{templete}</tbody>
		)
	}
}