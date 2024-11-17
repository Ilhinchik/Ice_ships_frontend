import {IShip} from "../api/ship/typing.ts";


export const shipList: IShip[] = [
    {'pk': 0, 
        'ship_name': 'Танкер TBN0986', 
        'year': 2000, 
        'ice_class': '1D',
        'length': 274.3,
        'engine': 'Главный двигатель MAN-B&W мощностью 20 942 л.с.',
        'status': 1,
        'description':'Танкер дедвейтом 147 080 тонн постройки, Южная Корея. Оборудован скруббером.',
        'image': ''
        },
   
       {'pk': 1,
        'ship_name': 'Крановый сухогруз TBN0973', 
        'year': 2005, 
        'ice_class': '1C',
        'length': 136.57,
        'engine': 'Главный двигатель Wartsila Х 3000 л.с.',
        'status': 1,
        'description':'Крановый сухогруз дедвейтом 9 000 тонн постройки, Китай. 3 крана Х 20 тонн.',
        'image': ''
    },
   
       {'pk': 2, 
        'ship_name': 'Крановый контейнеровоз TBN0977', 
        'year': 2014, 
        'ice_class': '1D',
        'length': 161.3,
        'engine': 'Главный двигатель B&W мощностью 12 643 кВт',
        'status': 1,
        'description':'Крановый контейнеровоз дедвейтом 17 300 тонн,  Китай. 2 крана Х 45 тонн. Контейнеровместимость 1 345 TEU.',
        'image': ''
    },
   
       {'pk': 3, 
        'ship_name': 'Танкер TBN0972', 
        'year': 2009, 
        'ice_class': '1C',
        'length': 92.85,
        'engine': 'Главный двигатель MAN мощностью 2775 л.с.',
        'status': 1,
        'description':'Танкер дедвейтом 3300 тонн, Турция.',
        'image': ''
    },
   
       {'pk': 4, 
        'ship_name': 'Многоцелевой твиндекер TBN0964', 
        'year': 2017, 
        'ice_class': '1D',
        'length': 274.3,
        'engine': 'Главный двигатель MAN-B&W Х 8800 л.с.',
        'status': 1,
        'description':'Многоцелевой твиндекер 31 700 мт, Китай. 2 крана Х 250 мт+ 1 кран Х 80 мт.',
        'image': ''
    },
];