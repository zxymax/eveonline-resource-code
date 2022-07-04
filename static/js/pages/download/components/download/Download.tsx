import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Section, Container, Row, Column } from 'layouts'
import SectionType from 'models/types/ts/sectionType'
import DownloadButton from '../../../../features/DownloadButton'
import SystemRequirements from './SysReq'
import style from './Download.module.scss'

interface Props {
    title: string
    body: string
    sections: Array<SectionType>
    hasContent: boolean
}

const Download = ({
    title,
    body,
    sections,
    hasContent,
}: Props): JSX.Element => {
    return (
        <div className={style.download}>
            <Section hasContent={hasContent}>
                <Container>
                    <Row>
                        <Column xs={12} md={8}>
                            <h2>{title}</h2>
                            <ReactMarkdown source={body} escapeHtml={false} />
                        </Column>
                        <Column xs={12} md={4}>
                            <DownloadButton />
                        </Column>
                    </Row>
                    <SystemRequirements sections={sections} />
                </Container>
            </Section>
        </div>
    )
}

export default Download
