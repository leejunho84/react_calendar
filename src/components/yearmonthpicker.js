'use strict';

import React, {Component} from 'react';

export default class YearMonthPicker extends Component{
	_dateCounter(type){
		var {pickerFunc, currentDate} = this.props;
		
		if(type == 'prev') pickerFunc(currentDate.month-1);
		else if(type == 'next') pickerFunc(currentDate.month+1);
	}

	render(){
		let {pickerFunc, currentDate} = this.props;
		return(
			<div className="current-date__sect">
				<div className="current-date__picker">
					<span className="left" onClick={(e)=>{this._dateCounter('prev')}}><i>이전</i></span>
					<span className="right" onClick={(e)=>{this._dateCounter('next')}}><i>다음</i></span>
				</div>
				<strong className="current-date__date">
					{`${currentDate.year}년 ${currentDate.month+1}월`}
				</strong>
			</div>
		)
	}
}