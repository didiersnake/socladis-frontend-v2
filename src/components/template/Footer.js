import React from 'react'
import classNames from 'classnames'
import { Container } from 'components/shared'
import { PAGE_CONTAINER_GUTTER_X } from 'constants/theme.constant'

const FooterContent = () => {
    return (
        <div className="flex items-center justify-between flex-auto w-full">
            <div className="">
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    {/* Term & Conditions */}
                </a>
                {/* <span className="mx-2 text-muted"> | </span> */}
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    {/* Privacy & Policy */}
                </a>
            </div>

            <span>
                Socladis &copy; {`${new Date().getFullYear()}`}
                {' par '}
                <span className="font-semibold">{`didier.djakoua@gmail.com`}</span>
            </span>
        </div>
    )
}

export default function Footer({ pageContainerType }) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
