const menuRouteMap = new Map([
    ['/', { index: 0, label: 'Home'}],
    ['/roster/RosterPage', { index: 1, label: 'Roster'}],
    ['/roster/CrewPage', { index: 2, label: 'Crew'}],
    ['/auth/BasicLogin', { index: 3, label: 'BasicLogin'}],
    ['/auth/OktaLogin', { index: 4, label: 'OktaLogin'}],
  ]);

export const getKeyByLabel = (map, label) => {
  for (let [key, value] of map.entries()) {
    if (value.label === label) {
      return key;
    }
  }
}

export default menuRouteMap;