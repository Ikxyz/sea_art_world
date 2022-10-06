import { ChangeEvent } from 'react';



export default function OnInputChange<T>(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, state: T, setState: (val: T) => void) {
    const name = event.target.name;
    const val = event.target.value;
    const data: any = {};
    data[name] = val as any;
    setState({ ...state, ...data });
}
