import IconTypeEnum from '../models/icon-type-enum'
import AcademyPage from '../models/academy-page-type'
import TemplateEnum from '../models/academy-page-template-enum'

const explorerPages: Array<AcademyPage> = [
    {
        title: 'Treasure Hunter',
        pageSlug: 'treasure-hunter',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Courier',
        pageSlug: 'courier',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Ghost Sites',
        pageSlug: 'ghost-sites',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Sleeper Caches',
        pageSlug: 'sleeper-caches',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Living in Wormhole Space',
        pageSlug: 'living-in-wormhole-space',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Harder Sleeper and DED Combat Sites',
        pageSlug: 'harder-sleeper-and-ded-combat-sites',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
]

const industrialistPages: Array<AcademyPage> = [
    {
        title: 'Hauler',
        pageSlug: 'hauler',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Manufacturer',
        pageSlug: 'manufacturer',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Salvager',
        pageSlug: 'salvager',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Miner',
        pageSlug: 'miner',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Reactions',
        pageSlug: 'reactions',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Tech 3 Production',
        pageSlug: 'tech-3-production',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Capital Ship Production',
        pageSlug: 'capital-ship-production',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Booster Manufacturing',
        pageSlug: 'booster-manufacturing',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Structure Production',
        pageSlug: 'structure-production',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
]

const enforcerPages: Array<AcademyPage> = [
    {
        title: 'Mission Runner',
        pageSlug: 'mission-runner',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Hunter',
        pageSlug: 'hunter',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Abyssal Deadspace',
        pageSlug: 'abyssal-deadspace',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Anomic Burner Missions',
        pageSlug: 'anomic-burner-missions',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Level 5 Mission',
        pageSlug: 'level-5-mission',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Pirate Faction Missions',
        pageSlug: 'pirate-faction-missions',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Incursions',
        pageSlug: 'incursions',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
]

const soldierOfFortunePages: Array<AcademyPage> = [
    {
        title: 'Faction Militia',
        pageSlug: 'faction-militia',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Pirate',
        pageSlug: 'pirate',
        contentfulSlugPrefix: 'eve-academy-activity-',
        template: TemplateEnum.Activity,
    },
    {
        title: 'Fleet Support Roles',
        pageSlug: 'fleet-support-roles',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Nanogangs',
        pageSlug: 'nanogangs',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Black Ops & Covert Ops',
        pageSlug: 'black-ops-covert-ops',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
    {
        title: 'Capital Ships',
        pageSlug: 'capital-ships',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
    },
]

const careerPages: Array<AcademyPage> = [
    {
        title: 'Explorer',
        pageSlug: 'explorer',
        contentfulSlugPrefix: 'eve-academy-careers-',
        template: TemplateEnum.CareerDetails,
        icon: IconTypeEnum.CareersExplorerIcon,
        pages: explorerPages,
    },
    {
        title: 'Industrialist',
        pageSlug: 'industrialist',
        contentfulSlugPrefix: 'eve-academy-careers-',
        template: TemplateEnum.CareerDetails,
        icon: IconTypeEnum.CareersIndustrialistIcon,
        pages: industrialistPages,
    },
    {
        title: 'Enforcer',
        pageSlug: 'enforcer',
        contentfulSlugPrefix: 'eve-academy-careers-',
        template: TemplateEnum.CareerDetails,
        icon: IconTypeEnum.CareersEnforcerIcon,
        pages: enforcerPages,
    },
    {
        title: 'Soldier of Fortune',
        pageSlug: 'soldier-of-fortune',
        contentfulSlugPrefix: 'eve-academy-careers-',
        template: TemplateEnum.CareerDetails,
        icon: IconTypeEnum.CareersSoldierOfFortuneIcon,
        pages: soldierOfFortunePages,
    },
    {
        title: 'Air Career Program',
        pageSlug: 'air-career-program',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
    // {
    //     title: 'Community Resources',
    //     pageSlug: 'community-resources',
    //     contentfulSlugPrefix: 'eve-academy-',
    //     template: TemplateEnum.CommunityResources,
    //     hideInNavigation: true,
    // },
]

const destroyerPages: Array<AcademyPage> = [
    {
        title: 'Coercer',
        pageSlug: 'coercer',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Corax',
        pageSlug: 'corax',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Cormorant',
        pageSlug: 'cormorant',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Algos',
        pageSlug: 'algos',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Thrasher',
        pageSlug: 'thrasher',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
]

const frigatePages: Array<AcademyPage> = [
    {
        title: 'Magnate',
        pageSlug: 'magnate',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Heron',
        pageSlug: 'heron',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Imicus',
        pageSlug: 'imicus',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Probe',
        pageSlug: 'probe',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Punisher',
        pageSlug: 'punisher',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Merlin',
        pageSlug: 'merlin',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Incursus',
        pageSlug: 'incursus',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Rifter',
        pageSlug: 'rifter',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Atron',
        pageSlug: 'atron',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
]

const miningShipPages: Array<AcademyPage> = [
    {
        title: 'Venture',
        pageSlug: 'venture',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Procurer',
        pageSlug: 'procurer',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
    {
        title: 'Iteron Mark V',
        pageSlug: 'iteron-mark-v',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipDetails,
    },
]

// Ready in Contentful
const shipPages: Array<AcademyPage> = [
    {
        title: 'Destroyers',
        pageSlug: 'destroyers',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipClass,
        icon: IconTypeEnum.ShipsDestroyersIcon,
        pages: destroyerPages,
    },
    {
        title: 'Frigates',
        pageSlug: 'frigates',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipClass,
        icon: IconTypeEnum.ShipsFrigatesIcon,
        pages: frigatePages,
    },
    {
        title: 'Mining Ships',
        pageSlug: 'mining-ships',
        contentfulSlugPrefix: 'eve-academy-ships-',
        template: TemplateEnum.ShipClass,
        icon: IconTypeEnum.ShipsMiningShipsIcon,
        pages: miningShipPages,
    },
    {
        title: 'Flying your ship',
        pageSlug: 'flying-your-ship',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
    {
        title: 'Combat Mechanics',
        pageSlug: 'combat-mechanics',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
]

const worldPages: Array<AcademyPage> = [
    {
        title: 'Economy of EVE',
        pageSlug: 'economy-of-eve',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
    {
        title: 'Trade Hubs',
        pageSlug: 'trade-hubs',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
    {
        title: 'Geography',
        pageSlug: 'geography',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
    {
        title: 'System Security',
        pageSlug: 'system-security',
        contentfulSlugPrefix: 'eve-academy-article-',
        template: TemplateEnum.Article,
        hideInNavigation: true,
    },
]

const sitemap: AcademyPage = {
    title: 'Frontpage',
    pageSlug: 'eve-academy-2-0',
    contentfulSlugPrefix: '',
    template: TemplateEnum.Frontpage,
    pages: [
        {
            title: 'Careers',
            pageSlug: 'careers',
            contentfulSlugPrefix: 'eve-academy-',
            template: TemplateEnum.Careers,
            icon: IconTypeEnum.Careers,
            pages: careerPages,
        },
        {
            title: 'Ships',
            pageSlug: 'ships',
            contentfulSlugPrefix: 'eve-academy-',
            template: TemplateEnum.Ships,
            icon: IconTypeEnum.Ships,
            pages: shipPages,
        },
        {
            title: 'World',
            pageSlug: 'world',
            contentfulSlugPrefix: 'eve-academy-',
            template: TemplateEnum.World,
            icon: IconTypeEnum.World,
            pages: worldPages,
            hideInNavigation: true,
        },
        {
            title: 'Flying your ship',
            subpage: 'ships',
            pageSlug: 'flying-your-ship',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            icon: IconTypeEnum.Ships,
        },
        {
            title: 'Combat Mechanics',
            subpage: 'ships',
            pageSlug: 'combat-mechanics',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            icon: IconTypeEnum.ArmorIcon,
        },
        {
            title: 'Clone States',
            pageSlug: 'clone-states',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            hideInNavigation: true,
        },
        {
            title: 'Currency in EVE',
            pageSlug: 'currency-in-eve',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            hideInNavigation: true,
        },
        {
            title: 'Magic 14',
            pageSlug: 'magic-14',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            hideInNavigation: true,
        },
        {
            title: 'Everyone Starts Somewhere',
            pageSlug: 'everyone-starts-somewhere',
            contentfulSlugPrefix: 'eve-academy-article-',
            template: TemplateEnum.Article,
            hideInNavigation: true,
        },
    ],
}

export default sitemap
