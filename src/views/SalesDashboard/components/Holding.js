import React from 'react'
import { Card, Avatar } from 'components/ui'
import NumberFormat from 'react-number-format'
import ArrowUp from '../../../assets/img/icons8-arrow-upward-100.png'
import ArrowDown from '../../../assets/img/icons8-arrow-down-100.png'

const HoldingCard = ({ data = {} }) => {
    const downArrowData = ['AVARIS', 'STOCK FAIBLES']
    return (
        <Card className="bg-gray-50 dark:bg-gray-700 border-0">
            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    <Avatar
                        className="bg-transparent"
                        src={
                            !downArrowData.includes(data.symbol)
                                ? ArrowUp
                                : ArrowDown
                        }
                        // shape="circle"
                    />
                    <div>
                        <h6 className="font-bold">{data.symbol}</h6>
                        <p>{data.name}</p>
                    </div>
                </div>
                <div className="text-right rtl:text-left">
                    <h6 className="mb-2">
                        <NumberFormat
                            displayType="text"
                            value={data.value}
                            suffix={
                                ![...downArrowData, 'PACKS'].includes(
                                    data.symbol
                                )
                                    ? ' XAF'
                                    : ''
                            }
                            thousandSeparator={true}
                        />
                    </h6>
                    {/* <GrowShrinkTag value={data.growshrink} suffix="%" /> */}
                </div>
            </div>
        </Card>
    )
}

const Holding = ({ data }) => {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h4>Inventaires</h4>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                {data.map((holding) => (
                    <HoldingCard key={holding.symbol} data={holding} />
                ))}
            </div>
        </Card>
    )
}

export default Holding
