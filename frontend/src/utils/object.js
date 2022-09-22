// function check if a value is an object
const isObject = (obj) => {
  // console.log(obj);
  return obj.constructor.name === "Object";
};

// function check if a value is an array
const isArray = (obj) => obj.constructor.name === "Array";

// function to find all the keys which do not have object as values
function Obj1(a) {
  // console.log(a.children);
  let nonObjectKeys = [];
  const keys = Object.keys(a);
  for (const key of keys) {
    if (!isObject(a[key])) {
      nonObjectKeys.push({ key, value: a[key] });
    } else {
      nonObjectKeys = [...nonObjectKeys, ...Obj1(a[key])];
    }
  }
  // console.log(nonObjectKeys);

  return nonObjectKeys;
}

// function to insert a value based on key
const insertValueByKey = (obj, key, value) => {
  let newObj = { ...obj };
  // console.log('---------', obj);
  if (Object.keys(obj).includes(key)) {
    if (isArray(obj[key])) {
      console.log("-----", obj, key, value);
      newObj = {
        ...newObj,
        [key]: [...newObj[key], value]
      };
      console.log("-----------------", newObj);
    }
  } else {
    for (const key1 of Object.keys(obj)) {
      if (isObject(obj[key1]))
        newObj = {
          ...newObj,
          [key1]: insertValueByKey(obj[key1], key, value)
        };
    }
  }

  return newObj;
};

// function to reduce an array of objects to a formatted obj {a: {b: {c: {d: 1, e: 3}}}}
export const reduce = (array) => {
  return array.reduce((acc, item, index) => {
    console.log("itemitemitemitem", item, acc);
    for (let key in item) {
      console.log("----item----", item);
      console.log("key", key);
      console.log("acc", acc);
      if (!acc?.[key]) {
        if (isObject(item[key])) {
          acc = {
            ...acc,
            [key]: reduce([item[key]])
          };
        } else {
          acc = {
            ...acc,
            [key]: [item[key]]
          };
        }
      } else {
        const itemValues = Obj1(item[key]);
        console.log("+++++++++++++", itemValues);
        for (const { key, value } of itemValues) {
          acc = insertValueByKey(acc, key, value);
        }
      }
    }
    return acc;
  }, {});
};
