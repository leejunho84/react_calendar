'use strict';

import React, { Component } from 'react';


export default class DaysPicker extends Component {
	_onClick(e){		
		console.log(e);
	}

	render(){
		let { days } = this.props;
		let templete = days.map((prop, index)=>{
			let temp = prop.map((prop, index)=>{
				return <td className='days' key={index} onClick={this._onClick}><span>{prop}</span></td>
			});
			return <tr key={index}>{temp}</tr>;
		});

		return (
			<tbody>{templete}</tbody>
		)
	}
}