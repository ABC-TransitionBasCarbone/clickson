import { EmissionFactor } from '@/src/types/EmissionFactor';
import { EmissionFactorFormField } from './EmissionFactorFormField';

export interface EmissionFactorFormProps {
    factor: EmissionFactor;
    keys: string[];
    handleInputChange: (id: string, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
}

export const EmissionFactorForm: React.FC<EmissionFactorFormProps> = ({ factor, keys, handleInputChange }) => (<div>
    {keys.map(key => (
        <EmissionFactorFormField fieldKey={key} id={factor.id} value={factor[key as keyof EmissionFactor]} handleInputChange={handleInputChange} />
    ))}
</div>);

export function isText(key: string) {
    return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number';
}
