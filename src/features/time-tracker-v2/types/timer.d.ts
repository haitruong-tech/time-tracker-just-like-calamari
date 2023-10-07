import { type PURPOSES, type RECORD, type UPDATE_PROGRESS } from "../constants";

export interface Timer {
  id: string;
  startTime: string;
  duration: number;
  purpose: PURPOSES;
}

export interface ITimerContext {
  timers: Timer[];
}

export interface ITimerActionsContext {
  work: () => void;
  takeBreak: () => void;
  workout: () => void;
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
