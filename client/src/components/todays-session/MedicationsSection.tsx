import React from 'react';
import MedicationCard from './MedicationCard';

interface MedicationData {
    id: string;
    name: string;
    dosageOptions: string[];
    frequencyOptions: { value: string; label: string }[];
    defaultDosage: string;
    defaultFrequency: string;
}

interface MedicationsSectionProps {
    selectedMedications: string[];
    onToggleMedication: (medication: string) => void;
}

const MedicationsSection: React.FC<MedicationsSectionProps> = ({
    selectedMedications,
    onToggleMedication
}) => {
    const medications: MedicationData[] = [
        {
            id: 'Paracetamol 500mg',
            name: 'Paracetamol',
            dosageOptions: ['250mg', '500mg', '650mg'],
            frequencyOptions: [
                { value: 'once-daily', label: 'Once daily' },
                { value: 'twice-daily', label: 'Twice daily' },
                { value: 'thrice-daily', label: 'Thrice daily' },
                { value: 'as-needed', label: 'As needed' }
            ],
            defaultDosage: '500mg',
            defaultFrequency: 'twice-daily'
        },
        {
            id: 'Ibuprofen 400mg',
            name: 'Ibuprofen',
            dosageOptions: ['200mg', '400mg', '600mg'],
            frequencyOptions: [
                { value: 'once-daily', label: 'Once daily' },
                { value: 'twice-daily', label: 'Twice daily' },
                { value: 'thrice-daily', label: 'Thrice daily' },
                { value: 'as-needed', label: 'As needed' },
                { value: 'every-6-hours', label: 'Every 6 hours' }
            ],
            defaultDosage: '400mg',
            defaultFrequency: 'as-needed'
        },
        {
            id: 'Vitamin D3',
            name: 'Vitamin D3',
            dosageOptions: ['400 IU', '1000 IU', '2000 IU'],
            frequencyOptions: [
                { value: 'once-daily', label: 'Once daily' },
                { value: 'twice-daily', label: 'Twice daily' },
                { value: 'weekly', label: 'Once weekly' }
            ],
            defaultDosage: '1000IU',
            defaultFrequency: 'once-daily'
        },
        {
            id: 'Omeprazole 20mg',
            name: 'Omeprazole',
            dosageOptions: ['10mg', '20mg', '40mg'],
            frequencyOptions: [
                { value: 'once-daily', label: 'Once daily' },
                { value: 'twice-daily', label: 'Twice daily' },
                { value: 'before-meals', label: 'Before meals' },
                { value: 'after-meals', label: 'After meals' },
                { value: 'empty-stomach', label: 'Empty stomach' }
            ],
            defaultDosage: '20mg',
            defaultFrequency: 'before-meals'
        },
        {
            id: 'Cetirizine 10mg',
            name: 'Cetirizine',
            dosageOptions: ['5mg', '10mg'],
            frequencyOptions: [
                { value: 'once-daily', label: 'Once daily' },
                { value: 'twice-daily', label: 'Twice daily' },
                { value: 'as-needed', label: 'As needed' },
                { value: 'at-bedtime', label: 'At bedtime' }
            ],
            defaultDosage: '10mg',
            defaultFrequency: 'once-daily'
        }
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-base font-semibold mb-3 text-gray-700 shrink-0">Recommended Medications</h3>
            <div className="flex-1 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow border border-gray-200 overflow-y-auto">
                <div className="space-y-2.5 pb-16">
                    {medications.map((medication) => (
                        <MedicationCard
                            key={medication.id}
                            name={medication.name}
                            dosageOptions={medication.dosageOptions}
                            frequencyOptions={medication.frequencyOptions}
                            defaultDosage={medication.defaultDosage}
                            defaultFrequency={medication.defaultFrequency}
                            isSelected={selectedMedications.includes(medication.id)}
                            onToggle={() => onToggleMedication(medication.id)}
                        />
                    ))}
                </div>
                <div className="sticky bottom-0 -mx-4 px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                    <button className="w-full h-11 px-4 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition shadow-none hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300">
                        Proceed with Medications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicationsSection;