import { Card, Avatar } from 'components/ui'
import { HiOutlineUserAdd, HiOutlineUserGroup } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { FiPackage } from 'react-icons/fi'

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value } = props

    const avatarSize = 55

    return (
        <Card bordered>
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
                {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
            </div>
        </Card>
    )
}

const CustomerStatistic = ({ data }) => {
    console.log(data)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-indigo-600"
                label="Nombre de clients"
                value={data?.users}
            />
            <StatisticCard
                icon={<FiPackage />}
                avatarClass="!bg-blue-500"
                label="Produits en ventes"
                value={data?.products}
            />
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Equipes de ventes"
                value={data?.teams}
            />
        </div>
    )
}

export default CustomerStatistic
