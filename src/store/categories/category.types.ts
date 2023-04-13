import { AnyAction } from "redux";

export type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

// type overloading in TS
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// type overloading in TS
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// function implementation in TS
export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export enum CATEGORY_ACTION_TYPE {
    FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED'
}

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
}

export type CategoryMap = {
    [key: string]: CategoryItem[];
}


// type Alien = {
//     fly: () => boolean
// }

// type Human = {
//     speak: () => number
// }

// function isHuman(entity: Alien | Human): entity is Human {
//     return (entity as Human).speak !== undefined;
// }

// type MyFunc = () => string;

// type MyReturn = ReturnType<Human['speak']>;


// const a = {
//     name: 'nisha',
//     age: 28
// }

// const c = {
//     address: 'jhilpar'
// }

// const d = {
//     village: 'mirpur'
// }

// Object.assign(a, c, d)
// console.log('a: ', a)


// const func = () => {
//     console.log('blah')
// }

// Object.assign(b, {
//     func
// })
// console.log('b: ', b)