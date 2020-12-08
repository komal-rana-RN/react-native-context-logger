declare module "react-native-context-logger" {
    type Reducer<State = any, Action = any> = (state: State, action: Action) => State;
    const useLogger = <State>(reducer: Reducer<State, Action>): Reducer<State, Action> => Reducer;
    export default useLogger
}
