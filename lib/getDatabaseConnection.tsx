import {createConnection, getConnectionManager} from 'typeorm';

const promise = (async function () {
  console.log('创建 connection');
  const manager = getConnectionManager();
  const hasDefaultConnection = manager.has('default');
  if (!hasDefaultConnection) {
    return createConnection();
  } else {
    const current = manager.get('default');
    if (current.isConnected) {
      return current;
    } else {
      return createConnection();
    }
  }
})();

export const getDatabaseConnection = async () => {
  return promise;
};


