import React from 'react'
import { useValues, useActions } from 'kea'
import { Checkbox } from 'antd'
import { compareFilterLogic } from './compareFilterLogic'

export function CompareFilter(props) {
    const { compare } = useValues(compareFilterLogic)
    const { setCompare } = useActions(compareFilterLogic)
    const { disabled } = props
    return (
        <Checkbox
            onChange={(e) => {
                setCompare(e.target.checked)
            }}
            checked={compare}
            style={{ marginLeft: 8, marginRight: 6 }}
            disabled={disabled}
        >
            Compare Previous
        </Checkbox>
    )
}
