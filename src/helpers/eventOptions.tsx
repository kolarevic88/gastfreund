import _ from "lodash";

interface EventOptions {
    id: boolean;
    overId: boolean;
    isUnder: boolean;
    isOverSameColumn: boolean;
}

export function eventOptions (event: any): EventOptions {
    const id = event?.active?.id;
    const overId = event?.over?.id;
    const task = event?.active?.data?.current?.task;
    const overTask = event?.over?.data?.current?.task;
    return {
        id,
        overId,
        isUnder: !_.isNil(event?.delta?.y) && event?.delta?.y < 0,
        isOverSameColumn: overTask?.status
            ? overTask.status === task?.status
            : overId ? overId === task?.status : true
    }
}
