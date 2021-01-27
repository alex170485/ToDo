export type UserType = {
    name: string
    age: number
    childrenCount: number
}

export type ActionType = {
    type: string
    [key: string]: any
}
// function incrementAge(user: UserType) {
//     return {...user, age: user.age + 1}
// }
//
// function incChildrenCount(user: UserType) {
//     return { ...user, incChildrenCount: user.childrenCount + 1 }
// }
// function ChangeName(user: UserType, newName: string) {
//     return {...user, name: newName }
// }

export function userReducer(user: UserType, action: ActionType ) {
    switch (action.type){
        case 'INCREMENT-AGE':
            return {...user, age: user.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return { ...user, childrenCount: user.childrenCount + 1 }
        case 'CHANGE-NAME':
            return {...user, name: action.newName }
        default:
            return user
    }
}