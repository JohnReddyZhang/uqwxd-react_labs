import React from 'react'
import MyButton from './MyButton'
import DivPanel from './DivPanel';

const mainPanel = () => {
    return (
        <div>
            Main Panel <MyButton></MyButton>
            <DivPanel></DivPanel>
        </div>
    )
}

export default mainPanel;