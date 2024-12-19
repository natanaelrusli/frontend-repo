export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'true'
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await response.json();

    if (response.ok) {
      return { success: true, token: res.data.token };
    } else {
      return { success: false, message: res.message || 'Login failed. Please try again.' };
    }
  } catch {
    return { success: false, message: 'An error occurred while logging in. Please try again.' };
  }
};

export const getUserData = async (token: string) => {
  const response = await fetch('http://localhost:8080/fetch-user-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  return data;
};

