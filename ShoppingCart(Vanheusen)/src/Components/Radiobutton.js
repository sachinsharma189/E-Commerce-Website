import React, { Component } from 'react';

class Radiobutton extends Component {
    render() {
        const { name, colorButtonToggle, imageKeys, handleChangeColor,selectedColor, color } = this.props;

        let checkmarkRadioStyle = {
            "background": imageKeys
        }
        return (
            <div className="radio">
                <ul>
                    {
                        checkmarkRadioStyle.background.map((item, i) => {
                            return (
                                <li key={i} onClick={colorButtonToggle}>
                                    <label className='radio-container'>
                                        <input
                                            className='radio-button'
                                            type='radio'
                                            onClick={(e) => handleChangeColor(e)}
                                            value={item}
                                            name={`${name} radio`}
                                        />
                                        {
                                            console.log("Value Check --->", item)
                                        }
                                        <span style={{ backgroundColor: item }} className="checkmark"></span>
                                    </label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Radiobutton;