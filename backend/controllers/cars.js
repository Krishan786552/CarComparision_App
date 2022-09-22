const path = require('path');
const fs = require('fs');
const { cars } = global.carData;
exports.getAllCars = (req, res, next) => {
  // setTimeout(() => res.status(200).json(cars.map(({ description, compareParams, ...rest }) => rest)), 5000);
  // cars?.forEach(item => delete item['feedback']);
  // fs.writeFileSync(path.resolve(__dirname, '..', 'mock-car-data', 'cars.json'), JSON.stringify({ cars }));
  res.status(200).json(cars.map(({ description, compareParams, ...rest }) => rest));

}

exports.getCarDetailsById = (req, res, next) => {
  const { id } = req.params;
  const item = cars.find((i) => i.id === id);
  console.log(item);
  if (item) {
    // setTimeout(() => , 5000);
    res.status(200).json(item);
  } else {
    return res.status(404).json({ message: 'Item Not Found' })
  }
}

exports.getComparedCarsData = (req, res, next) => {
  const { ids } = req.query;
  const compareData = [];
  if (ids) {
    ids.split(',').forEach(id => {
      const carDetail = cars.find(i => i.id === id);
      compareData.push({ id, name: carDetail?.name, compareData: carDetail?.compareParams });
    });
    res.status(200).json(compareData);
  }
}

exports.addFeedback = (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const item = cars.find((i) => i.id === id);
  if (item['feedback']) {
    item['feedback'] = [...item['feedback'], body];
  } else {
    item['feedback'] = [body];
  }

  // setTimeout(() => {
  fs.writeFileSync(path.resolve(__dirname, '..', 'mock-car-data', 'cars.json'), JSON.stringify({ cars }));
  res.status(200).json(item)
  // }, 5000);
  // setTimeout(() => {
  //   console.log(item);

  // }, 5000);
}

exports.removeFeedback = (req, res, next) => {
  const { id } = req.params;
  const { key } = req.body;
  console.log(id, key);
  const item = cars?.find((i) => i.id === id);
  item.feedback = item?.feedback?.filter((i) => i.key !== key);
  fs.writeFileSync(path.resolve(__dirname, '..', 'mock-car-data', 'cars.json'), JSON.stringify({ cars }));
  res.status(200).json(item);
}