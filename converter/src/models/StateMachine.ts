interface StateMachine {
    name: string
    clk?: string
    rst?: string
    states: State[]
}

interface State {
    name: string
    to: NextState[]
    issue?: string[]
}

interface NextState {
    name: string
    condition?: string
    issue?: string[]
}
