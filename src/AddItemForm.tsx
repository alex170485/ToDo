
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}


const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const AddItem = () => {
        let itemTitle = title.trim();
        if (itemTitle) {
            props.addItem(itemTitle);
        } else {
            setError('Title is required!')
        }
        setTitle('');
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') AddItem()
    };


    return (
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error} /*!отрицание для превращения строки в противоположное булево значение*/
                helperText={error}
                label={'Title'}
            />
            {/*<input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />*/}
            {/*
            <button onClick={AddItem}>+</button>*/}
            <IconButton
                    color={"primary"}
                    onClick={AddItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm