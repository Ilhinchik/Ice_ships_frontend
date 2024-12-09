import {FullIcebreaker} from "../api/Api.ts";

export const OIcebreaker: FullIcebreaker = {
    id: 1,
    status: "DRAFT",
    date_created: "2024-10-20T15:07:21.219Z",
    date_formation: "2024-10-20T15:07:21.219Z",
    date_complete: "2024-10-20T15:07:21.219Z",
    owner: 1,
    moderator: 1,
    date: "2024-10-21",
    start_point: "Россия",
    finish_point: "Норвегия",
    result: true,
    ship_list: [
        {
            ship: {
                id: 0,
                ship_name: 'Танкер TBN0986',
                ice_class: '1D',
                length: 274.3,
                image: '',
            },
            order: 1,
        },
        {
            ship: {
                id: 1,
                ship_name: 'Крановый сухогруз TBN0973',
                ice_class: '1C',
                length: 136.57,
                image: '',
            },
            order: 2,
        },
        {
            ship: {
                id: 2,
                ship_name: 'Крановый контейнеровоз TBN0977',
                ice_class: '1D',
                length: 161.3,
                image: '',
            },
            order: 3,
        },
    ]
};