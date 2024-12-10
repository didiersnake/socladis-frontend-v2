import React from 'react'
import ModeSwitcher from './ModeSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import NavModeSwitcher from './NavModeSwitcher'

const ThemeConfigurator = ({ callBackClose }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-10 mb-6">
                <div className="flex items-center justify-between">
                    <h6>Mode Sombre</h6>
                    <ModeSwitcher />
                </div>
                {/* <div className="flex items-center justify-between">
                    <div>
                        <h6>Direction</h6>
                        <span>Select a direction</span>
                    </div>
                    <DirectionSwitcher callBackClose={callBackClose} />
                </div> */}
                <div>
                    <h6 className="mb-3">Theme de navigation</h6>
                    <NavModeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">Theme</h6>
                    <ThemeSwitcher />
                </div>
                {/* <div>
                    <h6 className="mb-3">Layout</h6>
                    <LayoutSwitcher />
                </div> */}
            </div>
            {/* <CopyButton /> */}
        </div>
    )
}

export default ThemeConfigurator
