import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateSo')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateSo', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jateSo', 'readwrite');
  const store = tx.objectStore('jateSo');
  const request = store.put({ content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  console.error('putDb not implemented')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jateSo', 'readonly');
  const store = tx.objectStore('jateSo');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  console.error('getDb not implemented')
  return result;
};

initdb();
