import { BattleNetCharacterRef, BattleNetNamedRef, BattleNetRef, BattleNetSelfRef, TypeName } from './battlenet-general';

export interface BattleNetEquipment {
    character: BattleNetCharacterRef;
    equipped_items: BattleNetEquipmentItem[];
    _links: BattleNetSelfRef;
}

export interface BattleNetEquipmentItem {
    armor: DisplayStringValue;
    azerite_details: {
        // tslint:disable-next-line:no-any
        selected_powers?: any;
        selected_powers_string?: string;
        level?: DisplayStringValue;
        percentage_to_next_level?: number;
        // tslint:disable-next-line:no-any
        selected_essences?: any[];
    };
    binding: TypeName;
    bonus_list: number[];
    context: number;
    durability: DisplayStringValue;
    inventory_type: TypeName;
    item: BattleNetRef;
    item_class: BattleNetNamedRef;
    item_subclass: BattleNetNamedRef;
    level: DisplayStringValue;
    media: BattleNetRef;
    name: string;
    quality: TypeName;
    quantity: number;
    sell_price: {
        display_strings: {
            copper: string;
            silver: string;
            gold: string;
            header: string;
        };
        value: number;
    };
    sockets: {
        socket_type: TypeName;
        item: BattleNetNamedRef;
        display_string: string;
        media: BattleNetRef;
    }[];
    slot: TypeName;
    stats: {
        display_string: string;
        type: TypeName;
        value: number;
    }[];
}

interface DisplayStringValue {
    value: number;
    displayString: string;
}
