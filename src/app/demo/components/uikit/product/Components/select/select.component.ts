import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

import { SelectItemGroup } from 'primeng/api/selectitemgroup';
interface SelectedGroups {
    [groupLabel: string]: SelectItem[]; // Replace 'any' with the actual type of your filter items
}
interface CustomeSelectItemGroup extends SelectItemGroup {
    imgUri?: string;
    icon?: string;
}

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
    @Input() groupedFilters!: CustomeSelectItemGroup[];
    @Output() selectedValue = new EventEmitter();

    selectedFilters!: SelectItem[];
    constructor() {
        this.groupedFilters = [
            {
                label: 'Price',
                value: 'price',

                items: [
                    { label: 'Low to High', value: 'low' },
                    { label: 'High to Low', value: 'high' },
                ],
            },
            {
                label: 'Rating',
                value: 'rating',
                items: [
                    { label: '⭐', value: '1' },
                    { label: '⭐⭐', value: '2' },
                    { label: '⭐⭐⭐', value: '3' },
                    { label: '⭐⭐⭐⭐', value: '4' },
                    { label: '⭐⭐⭐⭐⭐', value: '5' },
                ],
            },
        ];
    }

    ngOnInit(): void {}

    detectChanges(event: any) {
        console.log('on change of filters', event);

        const selectedGroups: SelectedGroups = {};
        this.groupedFilters.forEach((group) => {
            const selectedItems = group.items.filter((item) =>
                this.selectedFilters.includes(item.value)
            );
            if (selectedItems.length > 0) {
                selectedGroups[group.value] = selectedItems;
            }
        });

        console.log('Selected Groups:', selectedGroups);

        this.selectedValue.emit(selectedGroups);
    }
}
