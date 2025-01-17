import React, { useEffect } from 'react'
import { Card, Avatar } from 'components/ui'
import { MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic } from '../store/dataSlice'
import { HiCollection } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import { FaShippingFast } from 'react-icons/fa'

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, loading } = props

    const avatarSize = 55

    const Period = () => (
        <>
            <p>
                <span className=" text-sm font-semibold">
                    {moment().format('MM[/]YYYY')}
                </span>
            </p>
        </>
    )

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumberFormat
                                    displayType="text"
                                    value={value}
                                    thousandSeparator
                                />
                            </h3>
                        </div>
                    </div>
                    <Period />
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    const dispatch = useDispatch()

    const statisticData = useSelector(
        (state) => state.salesOrderList.data.statisticData
    )
    const loading = useSelector(
        (state) => state.salesOrderList.data.statisticLoading
    )

    useEffect(() => {
        dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiCollection />}
                avatarClass="!bg-emerald-500"
                label="Magasin"
                value={statisticData?.users}
                // growthRate={statisticData?.totalCustomers?.growShrink}
                loading={loading}
            />
            <StatisticCard
                icon={<FaShippingFast />}
                avatarClass="!bg-blue-500"
                label="Livraison"
                value={statisticData?.customers}
                // growthRate={statisticData?.activeCustomers?.growShrink}
                loading={loading}
            />
        </div>
    )
}

export default CustomerStatistic
