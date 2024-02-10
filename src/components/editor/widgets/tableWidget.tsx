'use client';
import { DynamicTable } from "@/components/dynamicTable";
import { WidgetEnum } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import { useSelectedWidgetRepo, useObservable } from "@/store";
import { find } from 'lodash';


export type TableWidgetProps = {
    data: WidgetTypes;
};
export const TableWidget: React.FC<TableWidgetProps> = (props) => {
    const { data } = props;
    console.log('data:::', data)
    const selectedWidgetObs$ = useSelectedWidgetRepo();
    const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
    console.log('selectedWidgetState::', selectedWidgetState)
    // const { entities: { widgets } } = selectedWidgetState;
    // console.log('widgets::', widgets)
    const widgetData = find(selectedWidgetState, (widget) => widget?.id === data.id) || {}
    console.log(widgetData)
    return (
        <DynamicTable
            data-widget={WidgetEnum.TABLE}
            data-widget-id={data.id}
            data={widgetData}
        />
    )


}