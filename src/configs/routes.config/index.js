import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'dashboard',
        path: '/app/dashboard',
        component: React.lazy(() => import('views/SalesDashboard')),
        authority: [],
    },

    /**Products */
    {
        key: 'stockMenu.products',
        path: '/app/products',
        component: React.lazy(() =>
            import('views/stock/products/ProductList/index')
        ),
        authority: [],
    },
    {
        key: 'stockMenu.productNew',
        path: '/app/product-new',
        component: React.lazy(() =>
            import('views/stock/products/ProductNew/index')
        ),
        authority: [],
    },
    {
        key: 'stockMenu.productEdit',
        path: '/app/product-edit/:id',
        component: React.lazy(() =>
            import('views/stock/products/ProductEdit/index')
        ),
        authority: [],
    },

    /** Sales */
    {
        key: 'sales',
        path: '/app/sales',
        component: React.lazy(() => import('views/sales/OrderList/index')),
        authority: [],
    },
    {
        key: 'salesView',
        path: '/app/sales/order-details/:id',
        component: React.lazy(() => import('views/sales/OrderDetails/index')),
        authority: [],
    },
    {
        key: 'salesView',
        path: '/app/sales/sale-new',
        component: React.lazy(() => import('views/sales/SalesNew/index')),
        authority: [],
    },

    /** Users */

    {
        key: 'userMenu.users',
        path: '/app/users',
        component: React.lazy(() => import('views/users/users/UserList/index')),
        authority: [],
    },

    {
        key: 'userMenu.users',
        path: '/app/users/user-edit/:id',
        component: React.lazy(() => import('views/users/users/UserEdit/index')),
        authority: [],
    },

    {
        key: 'userMenu.users',
        path: '/app/users/user-new',
        component: React.lazy(() => import('views/users/users/UserNew/index')),
        authority: [],
    },

    {
        key: 'userMneu.group',
        path: '/app/group/group-new',
        component: React.lazy(() => import('views/users/group/GroupNew/index')),
        authority: [],
    },

    {
        key: 'userMneu.group',
        path: '/app/group',
        component: React.lazy(() =>
            import('views/users/group/GroupList/index')
        ),
        authority: [],
    },

    // Stock supply
    {
        key: 'stockMenu.supply',
        path: '/app/supply',
        component: React.lazy(() =>
            import('views/stock/purchase/PurchaseList/index')
        ),
        authority: [],
    },

    {
        key: 'stockMenu.supply',
        path: '/app/supply/supply-new',
        component: React.lazy(() =>
            import('views/stock/purchase/PurchaseNew/index')
        ),
        authority: [],
    },

    {
        key: 'stockMenu.supply',
        path: '/app/supply/supply-edit/:id',
        component: React.lazy(() =>
            import('views/stock/purchase/PurchaseEdit/index')
        ),
        authority: [],
    },

    // {
    //     key: 'stockMenu.load',
    //     path: '/app/team-load',
    //     component: React.lazy(() => import('views/stock/Load')),
    //     authority: [],
    // },
    // {
    //     key: 'stockMenu.return',
    //     path: '/app/team-return',
    //     component: React.lazy(() => import('views/stock/Return')),
    //     authority: [],
    // },

    //  Stock Avaris

    {
        key: 'stockMenu.damaged',
        path: '/app/damaged',
        component: React.lazy(() =>
            import('views/stock/avaris/AvarisList/index')
        ),
        authority: [],
    },

    {
        key: 'stockMenu.damaged',
        path: '/app/damaged/damaged-edit/:id',
        component: React.lazy(() =>
            import('views/stock/avaris/AvarisEdit/index')
        ),
        authority: [],
    },

    {
        key: 'stockMenu.damaged',
        path: '/app/damaged/damaged-new',
        component: React.lazy(() =>
            import('views/stock/avaris/AvarisNew/index')
        ),
        authority: [],
    },

    //Empty Store

    {
        key: 'stockMenu.emptyStore',
        path: '/app/empty-store',
        component: React.lazy(() =>
            import('views/stock/emptyStore/EmptyList/index')
        ),
        authority: [],
    },
    {
        key: 'stockMenu.emptyStore',
        path: '/app/empty-store/new',
        component: React.lazy(() =>
            import('views/stock/emptyStore/EmptyNew/index')
        ),
        authority: [],
    },

    {
        key: 'stockMenu.emptyStore',
        path: '/app/empty-store/empty-edit/:id',
        component: React.lazy(() =>
            import('views/stock/emptyStore/EmptyEdit/index')
        ),
        authority: [],
    },

    //  Store

    {
        key: 'stockMenu.store',
        path: '/app/store',
        component: React.lazy(() =>
            import('views/stock/stock/StockList/index')
        ),
        authority: [],
    },

    //Finance
    //cashin

    {
        key: 'financeMenu.cashIn',
        path: '/app/cash-in',
        component: React.lazy(() =>
            import('views/finance/supplyBox/SupplyList/index')
        ),
        authority: [],
    },

    {
        key: 'financeMenu.cashIn',
        path: '/app/cash-in/cash-in-new',
        component: React.lazy(() =>
            import('views/finance/supplyBox/SupplyNew/index')
        ),
        authority: [],
    },

    {
        key: 'financeMenu.cashIn',
        path: '/app/cash-in/cash-in-edit/:id',
        component: React.lazy(() =>
            import('views/finance/supplyBox/SupplyyEdit/index')
        ),
        authority: [],
    },

    //Cashout

    {
        key: 'financeMenu.cashOut',
        path: '/app/cash-out',
        component: React.lazy(() =>
            import('views/finance/fundExpenses/ExpenseList/index')
        ),
        authority: [],
    },
    {
        key: 'financeMenu.cashOut',
        path: '/app/cash-out/cash-out-edit/:id',
        component: React.lazy(() =>
            import('views/finance/fundExpenses/ExpenseEdit/index')
        ),
        authority: [],
    },
    {
        key: 'financeMenu.cashOut',
        path: '/app/cash-out/cash-out-new',
        component: React.lazy(() =>
            import('views/finance/fundExpenses/ExpenseNew/index')
        ),
        authority: [],
    },
]
