import { AutoOrderingError } from "./auto-ordering-error";
import { AutoOrderingState } from "./auto-ordering-state";

export interface OrderProgress {
    states: OrderProgressStatus[];
    lastStatus: AutoOrderingState;
    lastStatusUpdate: string;
}
export interface OrderProgressStatus {
    id:number
    date: Date,
    status: AutoOrderingState,
    error: AutoOrderingError,
    errorMessage: string
}