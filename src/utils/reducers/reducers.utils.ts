export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

//function overloading, having same number of parameters with different param types
// and can return different return types
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

//function implementation
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload }
}

// export const createAction = (type, payload) => ({ type, payload });


 