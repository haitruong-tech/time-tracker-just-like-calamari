import { PURPOSES, RECORD, UPDATE_PROGRESS } from "../constants";

export interface Timer {
  startTime: string;
  duration: number;
  purpose: PURPOSES;
}

interface TimerRecordActionPayload {
  lastUpdate: number;
  purpose: PURPOSES;
}

interface TimerRecordAction {
  type: typeof RECORD;
  payload: TimerRecordActionPayload;
}

interface TimerUpdateAction {
  type: typeof UPDATE_PROGRESS;
  payload: number;
}

export type TimerActions = TimerRecordAction | TimerUpdateAction;
