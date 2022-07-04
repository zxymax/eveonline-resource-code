import React from 'react'
import Hero from '../hero'
import Hero2 from '../hero2'
import Featured from '../featured'
import Mural from '../mural'
import ImageCards from '../image-cards'
import CardList from '../card-list'
import YTVideo from '../ytvideo'
import CTATemplate from '../cta-template'
import CTACard from '../cta-card'
import Rewards from '../rewards'

const ComponentFactory = ({ data, themeConfig }) => {
    const components = {}
    components.Hero = themeConfig.legacy ? <Hero /> : <Hero2 />
    components.HeroCenter = <Hero align="center" />
    components.HeroRight = <Hero align="right" />
    components.Featured = <Featured />
    components.ImageList = <ImageCards />
    components.Mural = <Mural />
    components.CardList = <CardList />
    components.YTVideo = <YTVideo />
    components.CTA = <CTATemplate />
    components.CTACard = <CTACard />
    components.Rewards = <Rewards />

    const componentTemplate = components[data.template]
    if (data.template == null || componentTemplate == null) {
        return null
    }

    return React.cloneElement(componentTemplate, { section: data })
}

export default ComponentFactory
