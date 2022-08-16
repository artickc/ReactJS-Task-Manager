interface Label {
    id: number;
    title: string;
    color: string; // HEX value
}

export interface LabelsState{
    labels: [{Label}]
    active: number
}

export enum LabelsActionTypes {
    FETCH_LABELS = "FETCH_LABELS",
    FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS",
    UPDATE_LABEL = "UPDATE_LABEL",
    FETCH_LABELS_ERROR = "FETCH_LABELS_ERROR"
}

interface FetchLabelsAction{
    type: LabelsActionTypes.FETCH_LABELS;
}
interface FetchTLabelsSuccessAction{
    type: LabelsActionTypes.FETCH_LABELS_SUCCESS;
    payload: any[]
}
interface FetchTLabelsErrorAction{
    type: LabelsActionTypes.FETCH_LABELS_ERROR;
    payload: string
}
interface updateLabelsAction{
    type: LabelsActionTypes.UPDATE_LABEL;
    payload: boolean
}
export type lLabelsAction = updateLabelsAction | FetchTLabelsErrorAction | FetchTLabelsSuccessAction | FetchLabelsAction
