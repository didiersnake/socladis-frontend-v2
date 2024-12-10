import { Card } from 'components/ui'
import React, { useEffect, useState } from 'react'

const UserDetails = ({value, users}) => {

    const [userData, setUserData] = useState({})
    const PaymentInfo = ({ label, value, isLast }) => {
        return (
            <li
                className={`flex items-center justify-between${
                    !isLast ? ' mb-3' : ''
                }`}
            >
                <span>{label}</span>
                <span className="font-semibold">
                    {value}
                </span>
            </li>
        )
    }
    useEffect(()=>{
        // console.log(value);
        setUserData(()=> {
            let user = users.find((i) => i.name === value)
            return user
        })
        
    }, [value, users])

  return (
      <Card className="">
          <h5 className="mb-4">Information Clients </h5>
          <ul>
              <PaymentInfo label="Regime Fiscal" value={userData?.tax_system} />
              <PaymentInfo label="Equipe" value={userData?.group} />
              <PaymentInfo label="Telephone" value={userData?.phone} />
              <PaymentInfo label="N I U" value={userData?.uniqueCode} />

              {/* <hr className="mb-3" /> */}
              <PaymentInfo
                  label="Category"
                  value={userData?.category}
              />
          </ul>
      </Card>
  )
}

export default UserDetails