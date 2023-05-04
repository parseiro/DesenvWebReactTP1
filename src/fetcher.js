export const creator = async (address, obj) => {
  const res = await fetch(
    address,
    {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.json();
};

export const fetcher = (...args) => fetch(...args).then(res => res.json());

export const patcher = async (address, obj) => {
  const res = await fetch(
    address,
    {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
  );
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.json();
};

export const deleter = async (address) => {
  const res = await fetch(
    address,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
};
