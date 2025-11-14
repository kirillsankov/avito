import Select from '../../atoms/select/select';
import Label from '../../atoms/label/label';


interface CategoryOption {
    value: number;
    label: string;
}

interface CategoryFilterProps {
    categoryId: number | null;
    options: CategoryOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CategoryFilter({ categoryId, options, onChange }: CategoryFilterProps) {
    const selectOptions = [
        { value: '', label: 'Все категории' },
        ...options.map((opt) => ({ value: opt.value.toString(), label: opt.label })),
    ];

    return (
        <div>
            <Label htmlFor="category">Категория</Label>
            <Select
                id="category"
                value={categoryId?.toString() || ''}
                onChange={onChange}
                options={selectOptions}
            />
        </div>
    );
}

export default CategoryFilter;

