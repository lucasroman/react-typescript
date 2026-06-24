import { useState } from 'react';

type GreetingProps = {
    name: string;
    age?: number;
}

type SaveButtonProps = {
    clicks: number;
    onSave: () => void;
}

type CardProps = {
    title: string;
    children?: React.ReactNode;
}

function NameInput() {
    const [value, setValue] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }
    return (
        <div>
            <input onChange={handleChange} />
            <p>{value}</p>
        </div>)
}

function SaveButton({ clicks, onSave }: SaveButtonProps) {
    
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        onSave(); 
    }
    return (
        <>
            <h2>Clicks {clicks}</h2>
            <button onClick={handleClick}>Save</button>
        </>
    );
}

function Card({ title, children }: CardProps) {
    return (
        <div>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export function Greeting({ name, age }: GreetingProps) {
    const [clicks, setClicks] = useState(0);

    return (
        <div>
            <NameInput />
            <h2>Hello, {name}!</h2>
            {age !== undefined && <p>You are {age} years old</p>}
            <SaveButton clicks={clicks} onSave={() => setClicks(clicks + 1)} />
            <Card title={'A title'}>
                <p>Child object</p>
                <p>Another child</p>
            </Card>
        </div>
    );
}