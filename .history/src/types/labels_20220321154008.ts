interface Label {
    id: number;
    title: string;
    color: string; // HEX value
}

export interface LabelsState{
    labels: [Label]
    active: number
}

export enum AppActionTypes {
    FETCH_LABELS = "FETCH_LABELS",
    FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS",
    UPDATE_LABEL = "UPDATE_LABEL",
    FETCH_LABELS_ERROR = "FETCH_LABELS_ERROR"
}

interface FetchLabelsAction{
    type: AppActionTypes.FETCH_LABELS;
}
interface FetchTLabelsSuccessAction{
    type: AppActionTypes.FETCH_LABELS_SUCCESS;
    payload: any[]
}
interface FetchTLabelsErrorAction{
    type: AppActionTypes.FETCH_LABELS_ERROR;
    payload: string
}
interface updateLabelsAction{
    type: AppActionTypes.UPDATE_LABEL;
    payload: boolean
}
export type lLabelsAction = updateLabelsAction | FetchTLabelsErrorAction | FetchTLabelsSuccessAction | FetchLabelsAction
