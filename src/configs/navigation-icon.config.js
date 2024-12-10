import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineLibrary,
    HiOutlineShoppingCart,
    HiOutlineClipboardCheck,
    HiOutlineExternalLink,
    HiOutlineUsers,
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    stock: <HiOutlineLibrary />,
    sales: <HiOutlineShoppingCart />,
    cashIn: <HiOutlineClipboardCheck />,
    cashOut: <HiOutlineExternalLink />,
    users: <HiOutlineUsers />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
