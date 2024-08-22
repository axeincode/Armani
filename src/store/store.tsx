// store.js
"use client";

import { BehaviorSubject } from "rxjs";
import { AppState } from "../types";

const initialState: AppState = {
  entities: {
    App: [
      {
        title: "Isle Ridge Towers",
        subtitle: "New York, NY",
        visits: {
          last7Days: 57,
          last30Days: 122,
          sinceStart: 480,
        },
      },
      {
        title: "The Atrium",
        subtitle: "Boston, MA",
        visits: {
          last7Days: 57,
          last30Days: 122,
          sinceStart: 480,
        },
      },
      {
        title: "Beechside Apartments",
        subtitle: "Miami, FL",
        visits: {
          last7Days: 57,
          last30Days: 122,
          sinceStart: 480,
        },
      },
      {
        title: "City Apartments",
        subtitle: "New York, NY",
        visits: {
          last7Days: 57,
          last30Days: 122,
          sinceStart: 480,
        },
      },
    ],
  },
};

const subject = new BehaviorSubject<AppState>(initialState);

export const store$ = subject;

export const updateStore = (newState: Partial<AppState>) => {
  const currentState = subject.value;
  subject.next({ ...currentState, ...newState });
};
