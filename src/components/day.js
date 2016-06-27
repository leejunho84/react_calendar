'use strict';

import React, { Component } from 'react';

export default class Day extends Component {
	_onClick(){
		/*if(this.props.clickIS){
			let _that = this.refs.day;
			this.props.onclick(_that.getAttribute('data-date'));
		}*/
		let _that = this.refs.day;
		this.props.onclick(_that.getAttribute('data-date'));
	}

	render(){
		let { currentDayIS, startDayIS, betweenDayIS, endDayIS, disabledIS, day } = this.props;
		let currentClass = 'days';

		if(currentDayIS) currentClass += ' today';
		if(startDayIS) currentClass += ' clicked';
		else if(betweenDayIS) currentClass += ' between';
		else if(endDayIS) currentClass += ' clicked';
		else if(disabledIS) currentClass += ' disabled';

		return(
			<td className={currentClass} 
				onClick={(e)=>{this._onClick();}} 
				data-date={day}
				ref='day'>
				<span>{day}</span>
			</td>
		)
	}
}