export interface AppState {
    entities: {
        App: AppInterface[]
    }
}

export interface AppInterface {
    title: string,
    subtitle: string,
    visits: Record<string, any>
}

