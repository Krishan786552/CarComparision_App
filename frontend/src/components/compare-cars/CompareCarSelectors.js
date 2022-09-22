import { createSelector } from "reselect";
import { reduce } from "../../utils/object";

const appState = state => state.app;
const compareState = state => state.compare;

export const getDropDownOptions = createSelector([appState], app => app?.data || []);
export const getDropDownDetails = createSelector([compareState], compare => compare?.dropdownDetails || []);

function search(nameKey, myArray) {
  return myArray?.find(i => Object.keys(i)?.[0] === nameKey)?.[nameKey];
}

export const getQuickCompareData = createSelector([compareState], compare => {
  if (!compare?.compareCarsData?.length) return {};
  const header = 'Quick Compare';
  const comapreData = compare?.compareCarsData;
  const keys = compare?.compareCarsData?.[0]?.compareData?.[header]?.flatMap(Object?.keys);
  console.log(keys);

  const quickData = [];
  keys?.forEach(key => {
    const values = comapreData?.reduce((acc, item, index) => (console.log(item?.compareData?.[header], key), ({ ...acc, [`value${index}`]: search(key, item?.compareData?.[header]) })), {});
    quickData?.push({ key, ...values });
  });

  return {
    header,
    quickData,
    tableHeaders: comapreData?.map((item) => item?.name)
  }
  // return {};
})


export const getFeaturesSpecsData = createSelector([compareState], compare => {
  if (!compare?.compareCarsData?.length) return {};
  const featuresSpecsData = compare?.compareCarsData?.map(({ compareData: { 'Quick Compare': compare, ...rest } }) => rest);
  return featuresSpecsData ? { featuresSpecs: reduce(featuresSpecsData), tableHeaders: compare?.compareCarsData?.map((item) => item?.name) } : {};
});