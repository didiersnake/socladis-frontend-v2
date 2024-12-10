import React, { cloneElement } from 'react'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                }}
            >
                <Logo mode="dark" />
                <div>
                    <p className="text-lg text-white opacity-80">
                        Votre plateforme de confiance pour gérer efficacement
                        les stocks de boissons. Connectez-vous pour accéder au
                        suivi des stocks en temps réel, rationalisez les
                        processus de réapprovisionnement et générez des rapports
                        détaillés pour garantir des niveaux de stock optimaux à
                        tout moment. Que vous gériez un magasin de détail ou une
                        distribution en gros, nos outils simplifient la
                        surveillance des stocks, minimisent les déchets et vous
                        tiennent informé avec des alertes en cas de stock faible
                        ou de surstock.
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    )
}

export default Side
