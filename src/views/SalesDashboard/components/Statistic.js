import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'

const StatisticCard = ({
    data = {},
    label,
    valuePrefix,
    date,
    description,
}) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumberFormat
                            displayType="text"
                            value={Number(data)}
                            thousandSeparator
                            // prefix={valuePrefix}
                        />
                    </h3>
                    <p>{description}</p>
                </div>
                {/* <GrowShrinkTag value={data.growShrink} suffix="%" /> */}
            </div>
        </Card>
    )
}

const Statistic = ({ data = {} }) => {
    // const startDate = useSelector(
    //     (state) => state.salesDashboard.state.startDate
    // )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                data={0}
                // valuePrefix="$"
                label="Utilisateurs"
                // tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard data={data?.orders || 0} label="Produits en Vente" />
            <StatisticCard
                data={data?.purchases || 0}
                label="Equipes Commerciales"
            />
        </div>
    )
}

export default Statistic
