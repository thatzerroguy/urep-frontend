declare module 'nigerian-states' {
  interface State {
    state: string;
    lgas: string[];
  }

  const nigerianStates: {
    states: () => State[];
    lgas: (stateName: string) => { lgas: string[] } | null;
  };

  export default nigerianStates;
}
