import Input from '../../atoms/input/input';
import Label from '../../atoms/label/label';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div>
            <Label htmlFor="search">Поиск по названию</Label>
            <Input
                id="search"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Введите название или описание..."
            />
        </div>
    );
}

export default SearchInput;

