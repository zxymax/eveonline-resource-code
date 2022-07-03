import ShipClassType from '../../models/ship-class-type'
import SmallIconEnum from '../../models/small-icon-enum'

const shipClasses: Array<ShipClassType> = [
    // Combat ships
    {
        id: 'corvette',
        name: 'Corvette',
        icon: SmallIconEnum.CorvetteIcon,
    },
    {
        id: 'frigate',
        name: 'Frigate',
        icon: SmallIconEnum.FrigateIcon,
    },
    {
        id: 'destroyer',
        name: 'Destroyer',
        icon: SmallIconEnum.DestroyerIcon,
    },
    {
        id: 'cruiser',
        name: 'Cruiser',
        icon: SmallIconEnum.CruiserIcon,
    },
    {
        id: 'battlecruiser',
        name: 'Battlecruiser',
        icon: SmallIconEnum.BattlecruiserIcon,
    },
    {
        id: 'battleship',
        name: 'Battleship',
        icon: SmallIconEnum.BattleshipIcon,
    },
    {
        id: 'carrier',
        name: 'Carrier',
        icon: SmallIconEnum.CarrierIcon,
    },
    {
        id: 'dreadnought',
        name: 'Dreadnought',
        icon: SmallIconEnum.DreadnoughtIcon,
    },
    {
        id: 'titan',
        name: 'Titan',
        icon: SmallIconEnum.TitanIcon,
    },
    // Non combat ships
    {
        id: 'capsule',
        name: 'Capsule',
        icon: SmallIconEnum.CapsuleIcon,
    },
    {
        id: 'shuttle',
        name: 'Shuttle',
        icon: SmallIconEnum.ShuttleIcon,
    },
    {
        id: 'mining-frigate',
        name: 'Mining Frigate',
        icon: SmallIconEnum.MiningFrigateIcon,
    },
    {
        id: 'mining-barge',
        name: 'Mining Barge',
        icon: SmallIconEnum.MiningBargeIcon,
    },
    {
        id: 'industrial',
        name: 'Industrial',
        icon: SmallIconEnum.IndustrialIcon,
    },
    {
        id: 'capital-industrial',
        name: 'Capital Industrial',
        icon: SmallIconEnum.CapitalIndustrialIcon,
    },
    {
        id: 'freighter',
        name: 'Freighter',
        icon: SmallIconEnum.FreighterIcon,
    },
]

export default shipClasses
