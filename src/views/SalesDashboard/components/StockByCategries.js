import React from 'react'
import { Card } from 'components/ui'
import { Chart } from 'components/shared'
import isEmpty from 'lodash/isEmpty'

const StockByCategories = ({ data = {} }) => {
    return (
        <Card>
            <h4>Stock par Marque</h4>
            <div className="mt-6">
                {!isEmpty(data) && (
                    <>
                        <Chart
                            donutTitle={`${data?.data.reduce(
                                (a, b) => a + b,
                                0
                            )}`}
                            donutText="Packs vendu"
                            series={data.data}
                            customOptions={{ labels: data.labels }}
                            type="donut"
                        />
                        {/* {data.data.length === data.labels.length && (
                            <div className="mt-6 grid grid-cols-2 gap-4 max-w-[180px] mx-auto">
                                {data.labels.map((value, index) => (
                                    <div
                                        key={value}
                                        className="flex items-center gap-1"
                                    >
                                        <Badge
                                            badgeStyle={{
                                                backgroundColor: COLORS[index],
                                            }}
                                        />
                                        <span className="font-semibold lowercase">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )} */}
                    </>
                )}
            </div>
        </Card>
    )
}

export default StockByCategories
