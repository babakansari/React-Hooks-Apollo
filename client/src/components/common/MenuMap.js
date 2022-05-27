const menuRouteMap = new Map([
    ['/', { index: 0, label: 'Home'}],
    ['/roster/RosterPage', { index: 1, label: 'Roster'}],
    ['/roster/CrewPage', { index: 2, label: 'Crew'}],
    ['/auth/BasicLogin', { index: 3, label: 'BasicLogin'}],
    ['/auth/OktaLogin', { index: 4, label: 'OktaLogin'}],
  ]);

export const getPathByLabel = (label) => {
  for (let [key, value] of menuRouteMap.entries()) {
    if (value.label === label) {
      return key;
    }
  }
}

export const getPathByIndex = (index) => {
  for (let [key, value] of menuRouteMap.entries()) {
    if (value.index === index) {
      return key;
    }
  }
}

export const getRouteByPath = (path) => {
  return menuRouteMap.get(path);
}

export const getPaths = () => {
  return menuRouteMap.keys();
}