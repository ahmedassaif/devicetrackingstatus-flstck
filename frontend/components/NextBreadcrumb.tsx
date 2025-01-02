'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <Breadcrumb>
            <BreadcrumbList className={containerClasses}>
                <BreadcrumbItem>
                    <BreadcrumbLink href={'/'}>{homeElement}</BreadcrumbLink>
                </BreadcrumbItem>
                {pathNames.length > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                {
                    pathNames.map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`
                        const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem className={itemClasses}>
                                    <BreadcrumbLink href={href}>
                                        {
                                            itemLink.toLowerCase() === 'dataunits' ? 'Lokasi Kerja' :
                                            itemLink.toLowerCase() === 'devicelocations' ? 'Lokasi Perangkat' :
                                            itemLink
                                        }
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathNames.length !== index + 1 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                            </React.Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default NextBreadcrumb