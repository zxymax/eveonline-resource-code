// import flags from 'config/flags'
import NavigationItemType from '../../models/navigation-item-type'

// This is the old/current nav item structure
// const list: Array<NavigationItemType> = [
//     {
//         translationId: 'navigation.news',
//         page: 'news',
//         dataId: 'eveNav_news',
//         selectedValues: ['news', 'articles'],
//     },
//     {
//         translationId: 'navigation.eveAcademy',
//         page: 'now',
//         sub: 'eve-academy',
//         dataId: 'eveNav_eveAcademy',
//         selectedValues: [
//             'eve-academy',
//             'eve-academy-explorer',
//             'eve-academy-industrialist',
//             'eve-academy-enforcer',
//             'eve-academy-soldier-of-fortune',
//         ],
//         children: [
//             {
//                 translationId: 'navigation.eveAcademyExplorer',
//                 page: '/now/eve-academy-explorer',
//             },
//             {
//                 translationId: 'navigation.eveAcademyIndustrialist',
//                 page: '/now/eve-academy-industrialist',
//             },
//             {
//                 translationId: 'navigation.eveAcademyEnforcer',
//                 page: '/now/eve-academy-enforcer',
//             },
//             {
//                 translationId: 'navigation.eveAcademySoldier',
//                 page: '/now/eve-academy-soldier-of-fortune',
//             },
//         ],
//     },
//     {
//         translationId: 'navigation.eveStore',
//         href: 'https://secure.eveonline.com',
//         locHref: 'https://secure.eveonline.com/?lan={language}',
//         dataId: 'eveNav_eveStore',
//     },
//     {
//         translationId: 'navigation.recruit',
//         page: 'recruit',
//         dataId: 'eveNav_recruit',
//         selectedValues: ['recruit'],
//         disabled: !flags.pages.recruitmentEnabled,
//     },
//     {
//         translationId: 'navigation.support',
//         href: 'https://support.eveonline.com/',
//         locHref: 'https://support.eveonline.com/hc/{language}',
//         dataId: 'eveNav_support',
//     },
//     {
//         translationId: 'navigation.download',
//         page: 'download',
//         dataId: 'eveNav_download',
//         selectedValues: ['download'],
//     },
// ]

// This is the new nav item structure
const list2: Array<NavigationItemType> = [
    {
        translationId: 'navigation.news',
        page: 'news',
        dataId: 'eveNav_news',
        selectedValues: ['news', 'articles'],
    },
    {
        translationId: 'navigation.eveStore',
        href: 'https://secure.eveonline.com',
        locHref: 'https://secure.eveonline.com/?lan={language}',
        dataId: 'eveNav_eveStore',
    },
    {
        translationId: 'navigation.discoverEve',
        dataId: 'eveNav_discover',
        selectedValues: ['eve-academy'],
        children: [
            {
                translationId: 'navigation.eveAcademyDetail',
                dataId: 'eveNav_eveAcademy',
                page: 'eve-academy',
            },
            {
                translationId: 'navigation.eveUniverse',
                dataId: 'eveNav_eveUniverse',
                href: 'https://universe.eveonline.com',
                external: true,
            },
            {
                translationId: 'navigation.capsuleerChronicles',
                dataId: 'capsuleerChronicles',
                page: 'capsuleer-chronicles',
            },
        ],
    },
    {
        translationId: 'navigation.community',
        dataId: 'eveNav_community',
        selectedValues: ['fanfest', 'partners'],
        children: [
            {
                translationId: 'navigation.forums',
                dataId: 'eveNav_forums',
                page: 'https://forums.eveonline.com',
                href: 'https://forums.eveonline.com',
                external: true,
            },
            {
                translationId: 'navigation.fanfest',
                dataId: 'eveNav_fanfest',
                page: 'fanfest',
            },
            {
                translationId: 'navigation.eveOnTwitch',
                dataId: 'eveNav_eveOnTwitch',
                href: 'https://www.twitch.tv/directory/game/EVE%20Online',
                external: true,
            },
            {
                translationId: 'navigation.partnershipProgram',
                dataId: 'eveNav_partnershipProgram',
                page: 'partners',
            },
            {
                translationId: 'navigation.volunteerSystem',
                dataId: 'eveNav_volunteersSystem',
                href: 'https://volunteers.eveonline.com',
                external: true,
            },
        ],
    },
    {
        translationId: 'navigation.support',
        href: 'https://support.eveonline.com/',
        locHref: 'https://support.eveonline.com/hc/{language}',
        dataId: 'eveNav_support',
    },
    {
        translationId: 'navigation.download',
        page: 'download',
        dataId: 'eveNav_download',
        selectedValues: ['download'],
    },
]

export default list2
