import {ActionType, userReducer, UserType} from "./user-reduser";

test('increment age', () => {
    const startUser: UserType = {
        name: 'Sasha',
        age: 18,
        childrenCount: 3
    }
    const endUser = userReducer(startUser, {type: 'INCREMENT-AGE'})
    expect(endUser.age).toBe(19)
})
test('increment children count', () => {
    const startUser: UserType = {
        name: 'Sasha',
        age: 18,
        childrenCount: 3
    }
    const endUser = userReducer(startUser, {type:'INCREMENT-CHILDREN-COUNT'})
    expect(endUser.childrenCount).toBe(4)
})
test('Change user name', () => {
    const startUser: UserType = {
        name: 'Sasha',
        age: 18,
        childrenCount: 3
    }
    const myAction: ActionType = {type: 'CHANGE-NAME', newName: 'Bob'}
    const endUser = userReducer(startUser,myAction)
    expect(endUser.name).toBe('Bob')
})