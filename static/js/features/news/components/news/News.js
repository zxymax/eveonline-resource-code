import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { propTypes, defaultProps } from './props'
import style from './News.scss'
import NewsItem from './NewsItem'
import { Container, Section, Column, Row, Border } from '../../../../layouts'

class News extends Component {
    renderNews = () => {
        if (!this.props.content) {
            return <span>loading news..</span>
        }

        return Object.keys(this.props.content).map((key) => {
            const item = this.props.content[key]
            return (
                <Column key={key} xs={12} md={4}>
                    <NewsItem item={item} s={style} />
                </Column>
            )
        })
    }

    render() {
        if (this.props.headline === undefined) return null
        return (
            <div className={style.news}>
                <Section>
                    <Container>
                        <Row>
                            <Column xs={12}>
                                <ReactMarkdown source={this.props.headline} />
                            </Column>
                        </Row>
                        <Border primary />
                        {/* Retrieve news from NewsItem Component */}
                        <Row>
                            <div className={style.newsitems}>
                                {this.renderNews()}
                            </div>
                        </Row>
                    </Container>
                </Section>
            </div>
        )
    }
}

News.propTypes = propTypes
News.defaultProps = defaultProps

export default News

